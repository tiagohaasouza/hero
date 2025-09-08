#!/bin/bash

REPO="tiagohaasouza/hero"
TOKEN="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"

git add . && git commit -m "master" && git push -u origin master
echo "🔍 Buscando PRs abertos em $REPO..."
prs_raw=$(curl -s -H "Authorization: token $TOKEN" https://api.github.com/repos/$REPO/pulls)

if ! echo "$prs_raw" | jq -e 'type == "array"' >/dev/null; then
  echo "❌ Erro ao buscar PRs. Resposta inesperada da API:"
  echo "$prs_raw"
  exit 1
fi

prs=$(echo "$prs_raw" | jq '.[].number' | grep -oE '[0-9]+')

for pr in $prs; do
  echo "➡️  Processando PR #$pr"

  git fetch origin pull/$pr/head:pr-$pr
  if [ $? -ne 0 ]; then
    echo "❌ Falha ao buscar PR #$pr. Pulando."
    continue
  fi

  git checkout master && git pull origin master

  git merge -s recursive -X theirs pr-$pr -m "Merge PR #$pr with --theirs strategy"
  if [ $? -eq 0 ]; then
    echo "✅ Merge do PR #$pr aplicado com sucesso."
    git push origin master --force
    echo "🚀 Push forçado do PR #$pr concluído."
    #git branch -D pr-$pr 2>/dev/null
    echo "--------------------------"

  else
    echo "⚠️  Conflito ou erro ao mesclar PR #$pr. Abortando merge."
    git merge --abort 2>/dev/null
  fi


done

echo "🏁 Todos os PRs foram processados."

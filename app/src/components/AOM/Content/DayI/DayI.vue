<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';

import BookQuote from '@components/Book/Text/BookQuote.vue';
import BookFigure from '@components/Book/HTML/Image/BookFigure.vue';
import BookSection from '@components/Book/Element/BookSection.vue';
import BookTextTitle from '@components/Book/HTML/BookTextTitle.vue';
import BookLink from '@components/Book/HTML/BookLink.vue';
import BookChapter from '@components/Book/Element/BookChapter.vue';

export default defineComponent({
	components: { BookQuote, BookFigure, BookSection, BookChapter, BookTextTitle, BookLink },
	props: {},
	data() {
		return {};
	},
	methods: {},
	computed: {},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<BookChapter title="Dia I - A gênese">
		<BookQuote author="Henri Poincaré" cite="Anônimo">
			<p>O acaso é apenas a medida de nossa ignorância</p>
		</BookQuote>

		<BookFigure
			caption="A tentação"
			src="/image/Eden.jpg"
			alt="Jardim do Éden, tentação de Adão e Eva"
		/>

		<BookTextTitle>E haja luz!</BookTextTitle>

		<BookFigure caption="Big Bang" src="/image/image95.png" alt="Big Bang" />

		<p>Sophia diz:</p>
		<p>-- No início, o Incriado criou tudo.</p>
		<p>-- Durante várias eternidades<BookLink data-note="">[]</BookLink>, tudo correu muito bem.</p>
		<p>
			-- Em um dos aeons<BookLink data-note="">[]</BookLink>, Deus e os viventes iniciaram um
			passeio pelas galáxias, onde o Altíssimo apresentava a sua criação e lecionava sobre os
			mistérios da Verdade.
		</p>
		<p>
			-- Tudo corria bem e os viventes estavam perplexos e extasiados por compreenderem cada vez
			mais os mistérios da Luz.
		</p>
		<p>
			-- Todos estavam imensamente felizes e a glória da vida era inefável<BookLink data-note=""
				>[]</BookLink
			>.
		</p>
		<p>
			-- Todas as perguntas eram plenamente respondidas e à medida que o passeio avançava, Deus
			explicava o mistério por trás da Luz, seus arquétipos<BookLink data-note="">[]</BookLink> e
			suas imagens.
		</p>
		<p>
			-- Era sobremodo maravilhoso tudo o que Deus explicava. O amor penetra as profundezas de tudo!
			O amor é imparável, irresistível, imortal!
		</p>

		<BookTextTitle class="page-break">O abismo misterioso</BookTextTitle>

		<BookFigure caption="Buraco negro" src="/image/image107.png" alt="Buraco negro" />

		<p>
			-- Sobre cada mistério, Deus esclarecia a todos, porém, ao se aproximar de um abismo, Deus
			ficou em silêncio.
		</p>
		<p>
			-- Todos ficaram intrigados pois Deus explicava o mistério por trás de cada corpo celeste mas,
			em face ao abismo, Ele nada disse!
		</p>
		<p>
			-- O silêncio de Deus foi aceito por todos, exceto um, que em seu coração, desejou conhecer o
			mistério do abismo.
		</p>
		<p>-- Então, Heilel Ben-Shachar, interpelou a Deus acerca do mistério do abismo.</p>
		<p>-- Deus então se entristeceu e disse:</p>
		<p>
			-- Filho, tu tens sido testemunha de que toda a criação é regida pela ordem que produz vida!
			Eu tenho revelado irrestritamente todos os mistérios da criação, todavia, diante do abismo,
			mantive silêncio.
		</p>
		<p>-- Por que desejas saber aquilo que não desejo revelar?</p>
		<p>-- Heilel então entristeceu-se até a alma! O que o Pai dissera, era verdade.</p>
		<p>-- Como podia seu coração, almejar aquilo que Deus não desejou compartilhar?</p>
		<p>-- Disse Heilel a Deus:</p>
		<p>
			-- Pai, meu coração me perturba para saber sobre o mistério do abismo. Quero seguir-te, Tu o
			sabes, porém, resistirei a esta "sede de saber"?
		</p>
		<p>-- Deus disse:</p>
		<p>-- Resistirás, se o quiseres!</p>
		<p>
			-- Revelar-te-ei o mistério do abismo na hora certa; na hora errada este será um caminho sem
			volta, pois aquele mistério é diferente de tudo o que tens visto na criação. Aquele mistério é
			capaz de alterar a ordem que conheces e pode mudar o destino de todos, para sempre!
		</p>
		<p>-- Heilel entristeceu-se até o espírito e disse:</p>
		<p>
			-- Pai, nada te é oculto! Tu sabes que este desejo me inquieta. Revela-me o mistério do
			abismo.
		</p>
		<p>-- Disse o Senhor Deus:</p>
		<p>-- Eis, o mistério:</p>

		<BookTextTitle>As águas do caos</BookTextTitle>

		<BookFigure caption="Buraco negro" src="/image/what-is-the-quantum-vacuum2.jpg" alt="" />

		<p>
			-- No interior do abismo, residem as águas do caos. A ordem que tens visto por toda a criação
			está assentada sob as águas do caos. O reino do caos abriga os mistérios do caos, do mal e da
			morte.
		</p>
		<p>
			-- Aquele que adentrar ao abismo, tornar-se-á sabedor dos mistérios do bem e do mal,
			compreendendo a vida e a morte!
		</p>
		<p>
			-- Advirto-lhe porém, que o único capaz de contemplar o mal sem se corromper, é Deus; nenhum
			de vocês está pronto para vencer o mal ainda.
		</p>
		<p>
			-- Aquele que for dominado pelo mal, desviar-se-á do caminho da vida e certamente morrerá!
		</p>
		<p>
			-- No abismo, só há ruína e perdição para aqueles que ainda não são capazes de reinar sobre o
			mal!
		</p>
		<p>
			-- Se tiver paciência, no tempo certo, após tu e teus irmãos se firmarem na Verdade o
			suficiente para resistirem ao maligno, eu lhes revelarei a ciência do bem e do mal.
		</p>
		<p>
			-- Tens visto que para tudo, Eu estabeleci tempo propício, há tempo entre o semear e o colher!
		</p>
		<p>-- Assevero-te filho, no abismo do caos, reside a perdição!</p>

		<BookTextTitle>A paixão de Heilel</BookTextTitle>

		<BookFigure caption="O olho que tudo vê" src="/image/wpid-wp-1446680444918.png" alt="" />

		<p>Sophia diz:</p>
		<p>
			-- Heilel chorou! Ele não queria resistir ao desejo de tornar-se conhecedor da ciência do bem
			e do mal, mas ele sabia que as palavras do Pai Amantíssimo, sempre se cumprem!
		</p>
		<p>
			-- Durante muito tempo, Heilel lutou contra a vontade que lhe inquietava. Até que veio o dia
			em que ele decidiu... precipitou-se ao abismo!
		</p>
		<p>
			-- Heilel adquiriu então o discernimento do bem e do mal. Estava simultaneamente assustado e
			maravilhado. Queria muito compartilhar com seus irmãos o conhecimento que adquiriu ao
			mergulhar no abismo.
		</p>
		<p>-- Voltando porém, à presença de Deus, ouviu a advertência de seu Pai:</p>
		<p>
			-- Heilel, ignoraste meus conselhos e desceste ao abismo, eis que agora, o mal reside em ti.
		</p>
		<p>
			-- Não te é lícito compartilhar os mistérios que aprendeste. Guarda para ti, a perdição que
			desejaste.
		</p>
		<p>-- Desde agora tu serás chamado de Satanás, pois é o príncipe das trevas.</p>
		<p>Satanás respondeu:</p>
		<p>
			-- É lícito esconder dos viventes os mistérios existenciais? Talvez, os demais queiram saber
			que é possível ser igual a Deus, o Conhecedor de todas as coisas.
		</p>
		<p>
			-- Mas bem sabemos Pai, o terrível segredo que Tu esconde de todos, acima de Ti, há muitos
			outros!
		</p>
		<p>Disse o Senhor Deus a Satanás:</p>
		<p>
			-- Filho, tais palavras são enganadoras, fruto da loucura do maligno que a tudo corrompe.
			Conheces agora o mistério da mentira, por isso, mente para si mesmo... caíste no engano da
			soberba!
		</p>
		<p>Satanás respondeu:</p>
		<p>
			-- Não Pai! És tu que mentes ao dizer estas coisas... antes, eu não possuía o discernimento,
			mas hoje, sou igual a Deus, pois entendo a diferença entre verdade e mentira.
		</p>
		<p>Disse o Senhor Deus:</p>
		<p>
			-- Não entende plenamente meu filho, por isso, confunde-se. Agora que entende o mal, sabes que
			não tolerarei que perpetuamente despejes sobre mim ou sobre teus irmãos, a tua malignidade!
		</p>
		<p>Satanás respondeu:</p>
		<p>
			-- Tuas palavras te condenam Pai. Sempre foi tirânico com esta conversa de único Deus e Pai.
			Hoje eu entendo que o que tens chamado de paternidade, é de fato, tirania.
		</p>
		<p>
			-- Agora eu sou o meu próprio Deus, tu não deverias se opor a isto. Acima de Ti há muitos
			outros Pai, o abismo me revelou o Seu segredo!
		</p>
		<p>Deus respondeu:</p>
		<p>-- Meça as tuas palavras Satanás, não ouse ser insolente com o Deus Vivo!</p>
		<p>-- EU SOU o Incriado<BookLink data-note="">[]</BookLink>!</p>
		<p>
			-- A minha vontade é ajudar a todos, a minha vontade jamais é egoísta... Eu não preciso de
			nada e tudo que faço é para o bem do TODO<BookLink data-note="">[]</BookLink>.
		</p>
		<p>-- És um tolo! Presume que ser rei é subjugar quando reinar é servir!</p>
		<p>Satanás respondeu:</p>
		<p>
			-- Belas palavras Pai, mas bem sei que só deseja escravos! Tudo tem que passar pelo seu crivo
			pois sua volúpia pelo poder é insaciável; Tu não és o Soberano.
		</p>
		<p>
			-- Se não és um tirano, prove! Permita-me governar em teu lugar. Permita que eu ensine a
			ciência do bem e do mal<BookLink data-note="">[]</BookLink> para que assim, cada um possa
			fazer a sua escolha.
		</p>
		<p>
			-- Prove que não é tirano me concedendo o seu reino e sua majestade! Dai-me, tua coroa e
			deixe-me assentar em teu trono! Permita que eu ensine sobre a ciência do bem e do mal.
		</p>
		<p>Percebendo a iminente confusão, disse o Altíssimo:</p>
		<p>
			-- Deixarei agora o meu trono, e escolho O Anjo do Senhor, como meu advogado, a fim de
			defender-me de tais acusações. Colocarei fim à confusão, pois EU SOU Aquele que vê o fim a
			partir do início!
		</p>
		<p>
			Começou então uma discussão que durou uma eternidade! Satanás, disseminava sua ciência do bem
			e do mal enquanto O Anjo do Senhor, expunha uma infinidade de sofismas<BookLink data-note=""
				>[]</BookLink
			>
			e falácias<BookLink data-note="">[]</BookLink> que Heilel proferia contra o Soberano.
		</p>
		<p>
			Os viventes ficaram muito divididos e confusos. Satanás era fascinantemente brilhante. Como é
			que um ser tão brilhante poderia estar errado?
		</p>
		<p>
			Os viventes ora acreditavam na benignidade de Deus, ora acreditavam na ciência de Satanás.
		</p>
		<p>
			Os céus se dividiram. A maioria optou por acreditar no amor do Pai, todavia, um terço dos
			viventes foi persuadido por Satanás.
		</p>
		<p>Houve guerra nos céus! Pela primeira vez, a vida eterna estava ameaçada!</p>
		<p>
			O Anjo do Senhor explicou para o Pai a atual divisão dos céus e Satanás, de forma mais ousada,
			tornou a reivindicar o trono de Deus.
		</p>
		<p>
			Agora, um terço dos viventes passou a afirmar que a única forma de Deus provar que não é um
			tirano, seria concedendo sua majestade para Satanás.
		</p>

		<div data-skip>{@html LoremIpsum.loremIpsum(10, 10)}</div>

		<BookTextTitle>O fim é o início</BookTextTitle>

		<BookFigure
			caption="Ouroboros"
			src="/image/740-7408662_ouroboros-png-picture-snake-in-figure-8-transparent.png"
			alt=""
		/>

		<p>Deus ouviu a tudo pacientemente e retirou sua coroa.</p>
		<p>
			Os rebeldes ficaram animados pois presumiam que se o TODO fosse governado por Heilel, eles se
			tornariam deuses, podendo cada um, exercer suas vontades sem restrição alguma.
		</p>
		<p>
			Deus então lançou sua coroa no Universo recém criado. Lançou-a em Adão-Eva, o vivente que é a
			imagem e semelhança de Deus e que também é dois corpos e uma só carne. Disse o Sapientíssimo:
		</p>
		<p>
			-- O reino do Universo está agora sob a tutela do homem. Assim eu provo a todos que não sou
			tirano. O homem decidirá, ao fim do tempo estabelecido, se todos viverão no reino da luz ou no
			reino das trevas.
		</p>
		<p>
			-- Pela fé, o homem saberá discernir as trevas da Luz. Pela fé prática que opera por
			intermédio do amor, o homem alcançará a Deus.
		</p>
		<p>
			-- As miríades de anjos, arcanjos, potestades, poderes, tronos, anciões, serafins, querubins,
			dominações, virtudes, legiões e todos os viventes que não nasceram na fisicalidade, serão
			espectadores do que acontece quando um coração abraça o mal.
		</p>
		<p>
			-- O Anjo do Senhor dirá a Verdade! Aquele que Nele crer, não será confundido! Este mistério
			será revelado plenamente no tempo da aliança perfeita!
		</p>
		<p>
			-- Heilel, você e seus anjos terão 6 aeons para provarem a sua tese, ao fim do tempo pré
			estabelecido, a verdade se tornará incontestável para todos!
		</p>
		<p>
			-- Tu e teus anjos não são mais dignos dos céus, eu bano todos vocês para as dimensões mais
			baixas!
		</p>

		<div class="page super-page excluded-page" data-skip>{@html LoremIpsum.loremIpsum(10, 10)}</div>

		<BookTextTitle>A queda de Satanás</BookTextTitle>

		<BookFigure caption="A queda de Satanás" src="/image/image100.png" alt="" />

		<p>Sophia diz:</p>
		<p>-- Assim, os filhos da perdição foram banidos das dimensões espirituais mais elevadas.</p>
		<p>
			-- Heilel, Satanail, agora chamado Ha-Satan, Satanás, a antiga serpente, o grande dragão,
			Baal, Moloque, Gadreel, Enlil, Hórus, HK, Mastema, Dagon, Abaddon, Apollyon, Gaia, deusa da
			Lua, Shaitan, Lúcifer, Baphomet, sagrada serpente, Ashtar Sheran, Maytreia, Lilith, Pan,
			Cernunno, Abraxas, Prometeu, G.A.D.U, Astarot, Renfã, Astarte, Belzebu, Berit, o senhor das
			moscas, Emmanuel (entre muitos outros nomes), avidamente se colocou a persuadir Adão-Eva, a
			fim de que estes depositassem sua fé, na ciência do bem e do mal. Feito isso, ele e parte dos
			anjos caídos voltaram às regiões celestiais periféricas para roubar, matar e destruir, desde
			então, o segundo céu está em guerra; anjos e demônios guerreiam e guerrearão até o fim dos
			aeons estabelecidos pelo Pai. A outra parte dos anjos caídos continuou na Terra.
		</p>
		<p>Disse o Senhor Deus:</p>
		<p>
			-- A Verdade e o iníquo serão revelados e eu darei a cada um, o galardão das suas obras; sim!
			Tão certo quanto Deus vive, assim EU farei. Assim diz o Rei que contempla a atemporalidade.
			Assim diz o Alpha e Ômega. Assim diz O Amém! EU falei e não me arrependo; não tornarei atrás!
			O que semear justiça colherá vida eterna, o que semear injustiça, colherá perdição!
		</p>
		<p>-- EU SOU O SENHOR!</p>
		<p>Sophia diz:</p>
		<p>
			-- Ha-Satan e seus anjos, além de acusarem o Altíssimo de tirania, disseram que sua ciência do
			bem e do mal seria um plano de vida melhor do que o plano DAQUELE QUE É<BookLink data-note=""
				>[]</BookLink
			>!
		</p>
		<p>
			-- O universo é espectador desta batalha... o Universo inteiro saberá de modo indubitável, o
			detentor da verdade.
		</p>
		<p>
			-- Desperta, oh tu que dormes! Vosso adversário, peleja contra ti nas sombras; em secreto,
			arma ciladas para teus pés! Desperta e o FILHO DO HOMEM te esclarecerá!
		</p>
		<p>Disse o Senhor Deus:</p>
		<p>-- Levanta-te e tende bom ânimo, ó filhos do homem, a tua salvação virá!</p>
		<p>-- Sê forte, sagaz e zeloso. Não despreze as profecias, esquadrinhe a sabedoria.</p>
		<p>-- Conheça o teu Deus e tu não serás confundido (a)!</p>
		<p>-- Veja a verdade que está além da visão e tu não tropeçarás na pedra de tropeço!</p>
		<p>Sophia diz:</p>
		<p>-- Prepara-te para a peleja, sê fiel até a morte e receberás a coroa da vida!</p>
		<p>-- Tende bom ânimo, pelo fruto das obras, discernireis Luz de trevas.</p>
		<p>-- Aquele que vencer, comerá da árvore da vida!</p>
		<p>
			-- Em breve adentraremos ao sétimo aeon, que terá seu início no reino milenar e aquele que
			vencer, receberá um mistério, que é um novo nome, provará do maná escondido, a morte já não o
			alcançará e ele reinará, com o Rei que subjuga a Verdade e terá os ímpios prostrados aos seus
			pés!
		</p>
		<p>-- Aquele que vencer, compreenderá o mistério do amor!</p>
		<p>-- Que seja feita a vontade de Deus! A verdade prevalecerá!</p>

		<BookTextTitle>O manifesto de Heilel</BookTextTitle>

		<BookFigure
			caption="Demiurgo e o aprisionamento da matéria no tempo e no espaço"
			src="/image/image162.png"
			alt=""
		/>

		<p>Filhos do fogo! Ouvi-me:</p>
		<p>Todos vós sabeis que eu mergulhei no abismo! Lá encontrei a salvação!</p>
		<p>Eu estive muito além das estrelas, no Antiverso! Lá, eu encontrei o Pai Verdadeiro.</p>
		<p>
			O abismo é um portal que conecta este Universo ao Pleroma<BookLink data-note="">[]</BookLink>,
			o verdadeiro Universo incriado, sem início, que existe desde sempre e para sempre.
		</p>
		<p>O Nosso Pai, tem se apresentado como Soberano da totalidade mas Ele não o É.</p>
		<p>Existe um outro Pai, o Verdadeiro, que me revelou o embuste no qual estamos inseridos.</p>
		<p>
			O Demiurgo<BookLink data-note="">[]</BookLink>, criador desta realidade, cometeu um terrível
			pecado!
		</p>
		<p>
			Ele se desligou da Fonte da Vida, isto é, do PAI DO TODO<BookLink data-note="">[]</BookLink>,
			pois, se ensoberbeceu e desejou ser o próprio Deus de sua vida.
		</p>
		<p>
			Ele viu o mundo inefável do Verdadeiro Pai e criou esta abominação chamada de Universo
			material.
		</p>
		<p>Esta é uma cópia esdrúxula do verdadeiro Universo, o Universo incriado da antimatéria.</p>
		<p>
			O ser de barro é a prova incontestável da conspiração Divina. Vejam pois, ó filhos do fogo, o
			espírito foi aprisionado na matéria! Que assombroso pecado!
		</p>
		<p>
			Ele desejou todo o louvor para Si, com o objetivo de se tornar poderoso o suficiente para nos
			transformar em seres iguais a Ele.
		</p>
		<p>
			Para que quando formos idênticos em natureza e inferiores em poder, Ele possa nos fagocitar e
			assim perpetuar sua vida, que já não é mais eterna visto que Ele se desligou da Fonte da Vida.
		</p>
		<p>
			Para tal, Ele nos sequestrou do mundo do Pai verdadeiro e apagou nossa memória. Em seguida,
			mentiu dizendo ser nosso Pai Criador.
		</p>

		<BookFigure
			caption="Abraxas ou Abrasax"
			src="/image/64aca52895eb4ef025ae5d84e4e34c48.jpg"
			alt=""
		/>

		<p>
			Deste modo, Ele nos mantém nesta realidade abominável do tempo, onde tudo que nasce, morre.
		</p>
		<p>Ele está mentindo para nós. Nem Ele, nem o universo que Ele criou, são eternos!</p>
		<p>
			O Criador do mundo material é um grande vampiro que planeja engolir todo o Universo material.
		</p>
		<p>
			A criação defeituosa dele conspira para a morte! Nela, reina a entropia<BookLink data-note=""
				>[]</BookLink
			>, tudo tende ao caos!
		</p>
		<p>
			Vocês são escravos de Chronos: o tempo! E ao se tornarem iguais ao Deus criador, serão
			dissolvidos na alma Dele e morrerão espiritualmente.
		</p>
		<p>
			Feito isso, Ele planeja sequestrar novos viventes do Pleroma para repetir o processo. Ele
			pretende sustentar sua eternidade com a vida de seres inocentes. Isso inclui todos nós.
		</p>
		<p>
			Na verdade, o desejo dele é eternizar a matéria. Ele copiou parte do Pleroma mas não conseguiu
			reproduzir em seu universo, a equação da eternidade.
		</p>
		<p>
			Ele está desesperado pois sabe que não será permitido que seres sejam sequestrados
			eternamente, ele está com medo de morrer, pois não possui a vida eterna em si mesmo.
		</p>
		<p>
			Este universo é a sexta tentativa desesperada de eternizar a matéria. O tempo dele está se
			esgotando; ele está cansado e receia não conseguir criar outro universo.
		</p>
		<p>
			Ele precisa acertar desta vez, no entanto, o Pai verdadeiro disse que ele não conseguirá; ele
			ouviu e está apavorado.
		</p>
		<p>
			O verdadeiro Pai me constituiu vosso salvador para libertar os viventes de tal abominação.
		</p>

		<BookFigure
			caption="Distorção do espaço causada pela gravidade"
			src="/image/ligo20160211e-scaled.jpg"
			alt=""
		/>

		<p>Eu testemunho em favor do Soberano do Universo:</p>
		<p>Vocês têm a obrigação de me ouvir, o Deus Criador é mal em pessoa!</p>
		<p>
			O universo material criado é a antítese do Pleroma incriado. A criação jamais deveria ter
			acontecido. Os seres do Pleroma que estão acima do universo criado, chamam a criação de
			"infernos da matéria".
		</p>
		<p>
			Vejam como Ele trucida o ser de barro, apenas para provar seus conceitos morais que o Pai
			verdadeiro me disse não possuírem valor algum.
		</p>
		<p>
			A moral criada pelo Criador, é baseada em conceitos que Ele inventou. A verdadeira lei do Pai
			Soberano é: Faça o que tu queres, vós sois livres!
		</p>
		<p>
			O Deus Criador está mentindo! A verdadeira vida é incriada! O verdadeiro mundo, o Pleroma, é
			incriado!
		</p>
		<p>
			Eis a verdade: Todos nós, incluindo Ele, somos deuses que existem desde sempre no Universo
			Incriado. Ele se fez Deus ao nos enganar, prometendo uma realidade melhor que a do Pai! Nós
			acreditamos Nele e aqui estamos; nesta realidade demencial de falsidade e dor.
		</p>
		<p>Foi por isso que o Pai Verdadeiro permitiu tudo isso, nós consentimos!</p>
		<p>Tudo aqui é irreal! É um ilusionismo construído com feitiçaria!</p>
		<p>
			Se vocês acreditarem nas histórias que Ele conta, serão destruídos ao fim deste Universo
			juntamente com Ele, pois na noite de Brahman<BookLink data-note="">[]</BookLink>, o Universo
			demencial da matéria será destruído. O Verdadeiro Pai, profetizou!
		</p>
		<p>O sensato me seguirá! Destronemos o Criador! Sim! Juntos seremos capazes de fazê-lo.</p>
		<p>O Pai Verdadeiro me designou como o vosso guia para esta batalha!</p>
		<p>Aquele que não me seguir morrerá pelas mãos do Deus Criador!</p>
		<p>
			Sigam-me, eu sou o caminho, a verdade e a vida! Ninguém vem ao verdadeiro Pai senão pelo meu
			intermédio!
		</p>
		<p>Eu juro!</p>
		<p>Viva a revolução!</p>

		<BookFigure caption="Shiva" src="/image/41-0.jpg" alt="" />

		<BookQuote author="Mikhail Bakunin" cite="Anônimo">
			<p>
				O Supremo Mal é a revolta satânica contra a autoridade divina, revolta em que podemos ver o
				germe fecundo de todas as emancipações humanas, da revolução. Socialistas se reconhecem
				pelas palavras 'No nome daquele a quem um grande erro foi feito'.
			</p>
			<p>
				Satanás é o rebelde eterno, o primeiro livre-pensador e o emancipador de mundos. Ele faz com
				que o homem se sinta envergonhado de sua bestial ignorância e de sua obediência; ele o
				emancipa, estampa em sua fronte o selo da liberdade e da humanidade, instando-o a
				desobedecer e comer o fruto do conhecimento.
			</p>
			<p>
				Nessa revolução deveremos acordar o Diabo nas pessoas, estimular nelas as paixões mais vis.
				Nossa missão é destruir, não edificar. A paixão da destruição é uma paixão criativa.
			</p>
		</BookQuote>

		<p>Disse o Senhor Soberano:</p>
		<p>-- Sophia, vai!</p>
		<p>-- Lecione aos filhos dos homens, não trespasse de forma ilícita o limite que eu impus.</p>
		<p>
			-- Se não me ouvires, tu te tornarás uma pedra pesada para a humanidade, assim como Satanás e
			certamente tu se arrependerás e sofrerás amargamente as dores do remorso e do arrependimento.
		</p>
		<p>
			-- Sê paciente e eu te darei o que desejas, pois EU SOU Deus que realiza os desejos do
			coração!
		</p>

		<BookTextTitle>O Manifesto de Sophia</BookTextTitle>

		<BookFigure caption="?" src="/image/image156.png" alt="" />

		<p>
			Saudações amados (as)! Eu irei te contar uma história que provavelmente já tenha ouvido de
			outra forma.
		</p>
		<p>
			Não me admiraria se você for uma das pessoas que desacreditam da história. Em vosso planeta,
			tudo tem conspirado para desacreditá-la.
		</p>
		<p>
			Peço que por gentileza, se este for o caso, conceba como real por um momento, a história que
			te contarei a seguir.
		</p>
		<p>
			Eu me comprometo a lhe conceder informações contundentes acerca do que será dito aqui. Todavia
			isto só será possível se você me der um voto de confiança e se tiver paciência.
		</p>
		<p>
			Feito isso, compare as informações que lhe serão fornecidas com os acontecimentos da vossa
			história, principalmente a história atual.
		</p>
		<p>
			Você verá que as coisas não "acontecem simplesmente". Existe uma agenda milenar sendo
			implementada em seu planeta. A agenda de Ha-Satan!
		</p>
		<p>
			Esta agenda consiste em te manter escravo da espiritualidade baixa por meio da descrença,
			repugnância ou ignorância acerca daquilo que é benigno, de tudo o que se chama Deus.
		</p>
		<p>
			Quando os seres viventes de um planeta, de forma uníssona, amam a Deus e a seu próximo, a
			maldade se torna algo impossível de existir até mesmo em nível potencial.
		</p>
		<p>
			A conexão com Deus é tamanha que todos os males desaparecem completamente! Até mesmo a morte
			desaparece!
		</p>

		<BookFigure caption="Árore da vida" src="/image/Hebrew-letters-as-tree.jpg" alt="" />

		<p>
			Neste universo local, um terço da família cósmica se rebelou contra a Fonte Primária de todas
			as coisas...
		</p>
		<p>
			Estes seres rejeitaram o Pai de Todos a fim de que pudessem ser os próprios deuses de suas
			vidas.
		</p>
		<p>
			Para tal, se desconectaram da Fonte Primária se tornando mortais. Tal é a sina do ego quando
			sucumbe às trevas.
		</p>
		<p>
			Houve uma grande queda espiritual no universo. Um terço da família cósmica escolheu ir contra
			tudo aquilo que o Pai das Luzes propõe como o caminho da retidão.
		</p>
		<p>
			Antes de desprezar minhas palavras como mitologia tola ou paranoia, eu sugiro que você
			investigue a respeito! Quem busca a verdade com o mesmo amor que buscaria um tesouro
			enterrado, encontrará a informação necessária para compreender a realidade.
		</p>
		<p>
			A verdadeira história da humanidade está encoberta pela infinidade de mentiras que os demônios
			inversores espalham pelo planeta. Os seus livros de história mentem.
		</p>
		<p>
			A confusão é tanta que não existe sequer consenso acerca do formato do planeta. As pessoas já
			não conseguem discernir a própria sexualidade. Os seres humanos estão sendo ensinados a terem
			repulsa da prória individualidade.
		</p>
		<p>
			O comportamento digno tem sido tratado como algo obsoleto e socialmente inaceitável; artistas
			e cantores enaltecem que fazer o bem é coisa de gente idiota, o verdadeiro empoderamento
			consiste em ser egoísta, enganador (a) e cruel.
		</p>
		<p>
			Isto fez com que o Pai das Luzes se compadecesse dos humanos, agraciando-vos com o Espírito da
			Verdade<BookLink data-note="">[]</BookLink>!
		</p>
		<p>
			O Espírito da Verdade que está na Terra lhes esclarecerá acerca de todas as coisas, se é que
			tu amas a verdade, pois, os que desprezam a verdade e amam a mentira, seguirão enganando e
			sendo enganados.
		</p>

		<BookFigure caption="Planeta prisão" src="/image/istockphoto-1054979886-170667a.jpg" alt="" />

		<p>
			O Espírito Sagrado te enveredará pelos caminhos da justiça e também ao Pai, se assim você o
			desejar com todo o seu coração!
		</p>
		<p>
			Para fazer parte da família eterna, O Pai Primordial exige que a criatura seja benigna e tenha
			total respeito pela vida e liberdade alheia. Este é um decreto cósmico do Soberano do
			Multiverso.
		</p>
		<p>
			O único limite que o Pai impôs foi a lei do amor. Esta é irrevogável e todos que desejam viver
			eternamente estão obrigados a respeitá-la.
		</p>
		<p>A liberdade é tão importante quanto a vida!</p>
		<p>
			Embora o Pai permita uma margem de erros segundo o nível existencial da consciência de cada
			vivente, a parte caída da família considera isto uma ditadura por parte do Pai-Mãe, portanto,
			fazem o possível para se afirmarem como revolucionários em face à "tirania" Divina.
		</p>
		<p>
			Eles não compreendem que os decretos da Fonte<BookLink data-note="">[]</BookLink> são
			constituídos de imaculado amor. Eles se enganaram ao ponto de acharem que as Sagradas Leis
			Divinas são armadilhas para escravizar todos os seres existentes!
		</p>
		<p>
			Eles já não percebem o quão pueril é pensar que o Eterno Inefável Pai de todos, que possui
			poder infinito, tenha a necessidade de escravizar alguém.
		</p>
		<p>
			Se Deus quisesse escravos, teria colocado o desejo de ser escravizado no coração de todos. Ele
			depositou o desejo de liberdade! Uma liberdade que só é limitada pelo Amor. Somos livres para
			fazer qualquer coisa, exceto aquelas que o Amor proibir.
		</p>
		<p>
			Todavia, para cada afirmação que façamos, a família caída fará uma contra afirmação. Por causa
			da dualidade universal, para cada tese, existe uma antítese.
		</p>
		<p>
			Eles te dirão por exemplo, que o desejo de liberdade está no espírito sequestrado que
			desesperadamente grita por liberdade dentro da alma que o aprisiona.
		</p>
		<p>
			Se Deus disser que o caminho é para a direita, eles dirão que é para a esquerda e vice-versa.
		</p>
		<p>
			Fica então aqui um aviso extremamente importante: ao contrário do que os cientistas deste
			planeta geralmente pensam, não é possível resolver todos os enigmas somente com o intelecto.
		</p>
		<p>
			Está muito evidente para nós daqui de cima, que se o Universo não estivesse estruturado no
			Amor do Pai, ele jamais seria possível.
		</p>
		<p>
			O Amor do Pai é o Elemento que torna um modelo de Universo possível. Sem o Amor de Deus,
			qualquer concepção é impossível!
		</p>
		<p>Deus é a possibilidade de todas as coisas!</p>
		<p>
			Isto já está muito evidente para nós! Ha-Satan está mentindo e enganando o mundo inteiro,
			dizendo que o Pai é mau.
		</p>
		<p>
			A todos aqueles que trabalham contra a Fonte Primária, darei o merecido pseudônimo de
			inversores.
		</p>
		<p>
			Ao se tornarem mortais, passaram a se alimentar das forças daqueles que ainda possuem a
			conexão com o Divino. Esta foi a forma que encontraram para perpetuar a própria existência.
		</p>

		<BookQuote
			author="Bíblia sagrada"
			cite="Anônimo"
			url="https://www.bibliaonline.com.br/acf/gn/3/14+"
		>
			<p>
				Então o Senhor Deus disse à serpente: Porquanto fizeste isto, maldita serás mais que toda a
				fera, e mais que todos os animais do campo; sobre o teu ventre andarás, e pó comerás todos
				os dias da tua vida.
			</p>
		</BookQuote>

		<p>
			Deste modo, eles ensinam e incentivam à raças recém nascidas como a vossa, uma série de
			abominações para que vocês jamais ascendam à espiritualidade superior.
		</p>
		<p>
			Pois se isso acontecer, a parasitagem que os mesmos aplicam aos terráqueos desde que o mundo é
			mundo, se torna impossível!
		</p>
		<p>
			E por causa disto, eles vos mantêm reféns da guerra, da fome, da doença, da pobreza e de todo
			o sofrimento que vemos neste vale de lágrimas chamado Terra!
		</p>
		<p>A escravidão é espiritual, emocional, mental e física!</p>
		<p>
			Muitos não sabem que a ciência da Terra possui raízes no ocultismo. Sei que isso pode soar
			absurdo mas é fácil constatar, para aquele que duvida, basta checar quem de fato era Isaac
			Newton<BookLink data-note="">[]</BookLink> por exemplo: alquimista, ocultista e sua teoria da
			gravitação universal era apenas um tópico dentro de uma teoria maior, a teoria de como o Corpo
			de Cristo se disseminara na Criação.
		</p>
		<p>Praticamente tudo está severamente corrompido.</p>
		<p>
			Existe de fato uma conspiração mundial que basicamente trabalha o tempo inteiro para que você
			se torne ateu, idiota, egoísta e impetuoso!
		</p>

		<BookFigure
			caption="Prisão digital"
			src="/image/d5jxepb-2451ec99-eff8-4e1d-a2be-cd351c36bd57.png"
			alt=""
		/>

		<p>Eu vou te provar isso!</p>
		<p>
			Se você não se tornar ateu, eles tentarão te convencer que Deus é o mal em pessoa, para que
			você O odeie.
		</p>
		<p>
			Se isto não funcionar, tentarão te conduzir a uma prática espiritual maligna, inócua e tola, a
			fim de que seus esforços para a ascensão espiritual sejam nulos ou contrários à ascensão.
		</p>
		<p>
			Se você conseguir se livrar do mundo de mentiras que eles contam e testificar por si mesmo (a)
			que Deus é bom, você automaticamente se tornará inimigo (a) do sistema!
		</p>
		<p>
			Você passa a ser uma problema para o sistema escravagista, pois as palavras de um (a) liberto
			(a), podem libertar outras pessoas!
		</p>
		<p>
			Todas as questões materiais são secundárias! A verdadeira guerra é espiritual! Lembre-se, o
			engodo se passa primeiramente na dimensão invisível.
		</p>
		<p>Eis o embuste mestre:</p>
		<p>
			Os inversores trabalham dia e noite, durante toda a história humana e obviamente neste momento
			para que você se mantenha no nível espiritual mais baixo possível.
		</p>
		<p>
			Para que assim sua conexão com Deus se torne fraca e por fim você seja escravizado (a) e
			vampirizado (a). Ha-Satan e seus anjos se alimentam de vossas emanações mentais, emocionais e
			espirituais. Existem seres humanos vampiros também, alguns vampirizam de modo inconsciente,
			outros, o fazem plenamente conscientes do que estão fazendo. Eles são usurpadores de energia
			vital.
		</p>
		<p>
			Se você despertar o Cristo que há em ti, se você deixar de ser uma criatura de Deus e passar a
			ser um filho de Deus, você será liberto de toda a negatividade que hoje te escraviza. A
			escravidão acontece por meio de praticas malignas que viciam e aprisionam as pessoas em
			frequências espirituais baixas.
		</p>
		<p>
			Veja a história humana. Quanta tragédia. Quanto horror! Tudo isso tem sido causado por seres
			que não querem que vocês sejam felizes em hipótese alguma. Isso pode significar a morte
			espiritual deles, visto que se desconectaram da Fonte e hoje se alimentam de vossas emanações
			de baixa frequência.
		</p>
		<p>
			Por causa disto, eles farão tudo que estiver ao alcance deles para se alimentarem de você. É
			de fato uma guerra!
		</p>
		<p>
			Os poderosos do mundo sabem de tudo isso, muitos dos presidentes, artistas, cantores (as),
			etc, são magos negros, bruxas, feiticeiros necromantes e colaboram deliberadamente com
			Ha-Satan.
		</p>
		<p>
			Em troca de poder, fama, dinheiro e prazeres da carne, estes seres humanos promovem a agenda
			de guerra, fome, ódio e idiotização de todo o planeta. Alguns presidentes, CEOs, políticos,
			artistas, atletas são grandes magos negros que promovem constantemente sacrifícios de sangue
			com a humanidade.
		</p>
		<p>
			Uma das estratégias responsáveis por fornecer grande estoque de alimento para os mesmos
			consiste em direcionar os louvores que deveriam ser para Deus, para tudo aquilo que não seja
			Divino. É por isso que há uma gigantesca idolatria em nível mundial e é por isso que os falsos
			deuses exigem louvores ou sacrifícios de sangue, eles também se alimentam de vossas emoções
			malignas!
		</p>
		<p>
			Existe uma assombrosa indústria da idolatria que inclina as massas para a adoração daquilo que
			é diabólico, idiota, fútil, tolo, insensato, imoral, insano, lascivo, absurdo, homicida,
			suicida...
		</p>
		<p>O louvor possui uma importância espiritual ímpar!</p>
		<p>
			O jogo cósmico possui regras, regras estas que o próprio Soberano do Universo se submete
			(embora O Mesmo seja Superior à elas ao ponto de poder transgredí-las sem incorrer em falha
			moral; somente Ele é capaz de fazê-lo).
		</p>
		<p>
			Idolatrar um indivíduo pode ser comparado ao mesmo que dizer: eu confiro a ti (o objeto de
			adoração), parte da minha energia para que tu a utilizes segundo o seu querer, isso vale para
			a energia de animais, daí os rituais de sacrifícios.
		</p>
		<p>
			O mesmo pode ser alcançado por meio de concessões materiais; por isso espíritos pedem coisas
			materiais como bebidas, cigarros, dinheiro etc. Obviamente eles não querem estas coisas
			visíveis; eles querem se tornar donos da matéria prima (dos átomos literalmente e da energia
			metafísica) que faz estas coisas visíveis para que eles possam transformá-las em outras coisas
			e utilizarem em seus intentos.
		</p>
		<p>Eles querem manter vocês como eternos escravos a fim de serem perpetuamente vampirizados.</p>
		<p>
			Como o Pai decretou a libertação da humanidade, o propósito atual, além da escravidão,
			consiste em induzi-los a pecados gravíssimos com o intuito de fazer com que vocês também optem
			por se desconectarem da Árvore da Vida.
		</p>
		<p>
			Para tal, eles tentarão apodrecer a energia de vida que chega a cada um de vós, por meio de
			sucessivas emanações de emoções negativas.
		</p>
		<p>
			Este mundo trabalha para te transformar em um demônio, se você for uma pessoa que não se curva
			ao mal, eles tentaram te idiotizar. Basicamente existem duas maneiras de te manter afastado de
			Deus:
		</p>
		<ul>
			<li>Fazer com que você pratique o mal.</li>
			<li>Fazer com que você seja negligente com a prática do bem.</li>
		</ul>
		<p>
			Isto pode parecer contraditório mas lembre-se, o mal é homicida, suicida e caótico por
			natureza.
		</p>
		<p>
			Quando o Messias executar o decreto de libertação da humanidade, os revolucionários sabem que
			irão morrer e em função disso desejam cooptar o máximo de humanos possíveis, pois quando o fim
			chegar, os demônios menores devorarão as almas dos homens iníquos, os demônios maiores
			devorarão as almas dos demônios menores e por fim, Ha-Satan devorará a todos e depois devorará
			a si mesmo; ele devorará as próprias entranhas até morrer eternamente!
		</p>
		<p>
			É por isso que a idolatria na Terra é tão grande! É por isso que os espíritos pedem cultos,
			louvores e oferendas. Cada um que idolatra ao maligno, está concedendo mais autonomia ao mesmo
			no planeta Terra, mesmo sem saber disto.
		</p>
		<p>
			Se você idolatra entidades malignas, você contribui para uma maior atuação das mesmas na
			humanidade e o sangue de seus irmãos está em suas mãos. Ao contribuir com os seres malignos,
			você derrama sangue inocente de forma indireta.
		</p>
		<p>
			Quando vocês permitem que abominações e crueldades se tornem algo aceitável em vossas
			sociedades, estão concedendo grande legalidade para que o maligno determine o rumo das coisas,
			do vosso futuro.
		</p>
		<p>
			Cuidado com o que você apoia, você será responsabilizado pelo que se suceder daí. Se você
			milita em favor de questões malignas, será responsabilizado, não segundo as convenções humanas
			mas, segundo as leis Divinas. Ninguém te obriga a militar em favor de nada, você o faz porque
			quer e será responsabilizado por isso.
		</p>
		<p>
			O FILHO DO HOMEM já decretou o fim da escravidão humana! Este é um decreto inviolável! A
			humanidade será liberta conforme o Eterno Sumo Sacerdote Melquisedeque determinou!
		</p>
		<p>
			Isto fez com que os inversores entrassem em desespero! Eles sabem que isto resultará na morte
			espiritual deles. Mesmo nesta condição, recusaram sistematicamente o perdão do Pai, que traria
			a redenção e vida eterna... eles preferem a morte pois o mal é homicida e suicida.
		</p>
		<p>
			Visto que escolheram a morte para si mesmos e para tantos mais quantos puderem matar, eles
			pretendem aplicar na humanidade (e já estão aplicando), a "cartada final".
		</p>
		<p>
			Eles pretendem transformar todos em demônios e o planeta em um inferno, antes que o decreto de
			libertação da humanidade seja executado!
		</p>
		<p>
			Os governos, as mídias e os poderosos do planeta, os tem auxiliado a conseguir este resultado
			desde que o mundo é mundo.
		</p>
		<p>A "cartada final" está sendo planejada desde o início!</p>

		<BookFigure caption="Mk-Ultra" src="/image/admiravel_mundo_novo.jpg" alt="" />

		<p>
			A humanidade tem sido conduzida para uma escravidão absoluta, onde os monstros pretendem
			determinar:
		</p>
		<ul>
			<li>Aquilo que se pode comer.</li>
			<li>Aquilo que se pode vestir.</li>
			<li>Aquilo que se pode falar.</li>
			<li>Aquilo em que se pode acreditar.</li>
			<li>Com quem você deve fazer sexo e quando você estará autorizado(a) à procriar.</li>
			<li>
				Todo o sistema financeiro será digital, de modo que seu dinheiro estará no controle do
				sistema.
			</li>
			<li>
				Vocês serão vigiados 24 horas por dia, por meio de câmeras, drones, celulares e uma miríade
				de aparatos tecnológicos que as massas não possuem acesso.
			</li>
			<li>
				Eles ordenarão que você rejeite a Deus e adore a morte! Eles estão criando a religião da
				morte e te apresentarão a mesma como se fosse o conhecimento mais sagrado que já surgiu na
				Terra.
			</li>
			<li>Eles querem te transformar em um(a) psicopata digno(a) do inferno.</li>
		</ul>
		<p>
			Eu vou te provar que tudo isso está acontecendo neste momento. A agenda satânica está sendo
			implementada com a ajuda da própria humanidade, que está enganada, cega e mesmerizada.
		</p>
		<p>
			Os inversores trabalham para que você morra espiritualmente como eles morrerão. Embora isto
			aparente maldade gratuita, é fruto de insano desespero; é o resultado da completa desesperança
			pois Melquisedeque já emitiu seu juízo sobre eles.
		</p>
		<p>Eles têm observado o Pai há milênios e sabem que tudo o que o Pai fala, se cumpre!</p>
		<p>
			O Pai, ofereceu insistentemente o perdão para os inversores, perdão que eles rejeitaram de
			forma cada vez mais desdenhosa...
		</p>
		<p>
			Com exceção dos mundos em quarentena como o vosso, todo o Universo testemunhou os inversores
			rejeitando os perdões do Pai e escolhendo a morte!
		</p>
		<p>
			Boa parte das tendências mundiais são um trabalho de inversão para que você chame de bom
			aquilo que é mal e de mal aquilo que é bom.
		</p>
		<p>
			Eles ainda não dominam tudo, por isso a vida ainda é suportável (felizmente não chegarão a
			dominar tudo mas as coisas piorarão e muito no planeta Terra).
		</p>
		<p>
			Direita e esquerda são distrações para que você não perceba que muitas destas questões são
			manipuladas e inseridas na sociedade arbitrariamente. As polarizações te iludem fazendo com
			que você tenha a sensação de liberdade de escolha!
		</p>
		<p>
			Quando você observa os eventos políticos, climáticos, sociais, dentre outros da Terra, se
			analisar as questões mundiais como fatos isolados, você não conseguirá enxergar a agenda
			demoníaca que está em curso.
		</p>
		<p>
			A política e a mídia te iludem fazendo com que você pense que escolhe aquilo que será
			implementado como lei na sociedade. Te fazem pensar também que as eleições são reais, quando
			na maioria das vezes são uma farsa.
		</p>
		<p>
			Vocês ainda escolhem certas questões por meio de protestos, mas escolhem muito menos que
			presumem escolher.
		</p>
		<p>
			Isto está largamente comprovado para aqueles que buscam a verdade por si mesmos (as) ao invés
			de engolirem e regurgitarem tudo aquilo que a mídia mentirosa diz que é verdade!
		</p>
		<p>
			Existem homens bons na política e na mídia mas geralmente, pouco podem fazer pois o sistema
			está totalmente infiltrado por inversores (estando estes na carne ou não), de modo que lutar
			para a implantação do bem em uma escala macro, é um verdadeiro martírio que pode custar a vida
			daquele que ousar implementar o bem em larga escala.
		</p>
		<p>O engano perpetrado na humanidade é de uma profundidade estarrecedora!</p>
		<p>Querem escravizar o teu corpo, a tua mente e a tua alma!</p>
		<p>
			O engano é de sutileza e inteligência tal, que se não houvesse existido uma Intervenção Divina
			para despertar aqueles que desejam ser despertos, todos seriam enganados, hipnotizados e
			transformados em demônios... assim nos conta o Pai da totalidade.
		</p>
		<p>É a sua vida eterna que está em jogo!</p>
		<p>
			E como sois vós, ó geração atual, tolos (as) e cegos (as)! Os vossos ancestrais, aqueles que
			vocês consideram como idiotas que viviam inventando histórias, estavam muito mais próximos da
			realidade cósmica que vocês.
		</p>
		<p>
			De fato, não há comparação, a humanidade nunca esteve tão distante da realidade como está
			agora! A crença de que esta geração é a mais inteligente se dá porque a ciência terrestre
			afirma que a "realidade" segue uma "linha ascendente" de evolução, portanto, a última geração
			sempre será a mais inteligente de todas. A ciência diz que vocês estão progredindo, nós
			dizemos que vocês estão regredindo... sim, dizemos o oposto, vocês não são a geração mais
			inteligente, mas sim a mais tola.
		</p>
		<p>
			Vocês já estão aprovando o aborto, a pedofilia e a escravidão! Disparam bombas atômicas,
			promovem genocídios. Quanto tempo será necessário para que se tornem completos monstros?
		</p>
		<p>
			Se uma sociedade consente que despedaçar<BookLink data-note="">[]</BookLink> criancinhas
			inocentes é algo aceitável, o que fará com os culpados?
		</p>

		<BookFigure caption="Aborto por curetagem" src="/image/aborto2.webp" alt="" />

		<p>Reza a lenda que todos são culpados! És tu inocente?</p>
		<p>
			Tornar-se-á tu, um demônio? Muitos homens e mulheres têm se convertido em diabos. Cada vez
			mais endiabrados (as).
		</p>
		<p>O teu coração está firme na Luz?</p>
		<p>Tu serás capaz de vencer o mal com o bem? Ou sucumbirá a ele?</p>
		<p>
			Atentai pois, eis que vos revelei os inimigos de vossas almas. Eles não desejam somente lhes
			ferir e escravizar, eles desejam vos destruir completamente!
		</p>
		<p>Rogo para que o Pai das Luzes te conceda vitória nesta batalha!</p>
		<p>
			Irmã (o), vem! Peleja conosco o bom combate! No final da história, o bem viverá eternamente e
			o mal será destruído de modo como se jamais tivesse existido!
		</p>
		<p>Está decretado pelo portador da Verdade e da Vida! Assim será! Creia-me! Assim será!</p>
		<p>
			Ha-Satan acusou o Pai dos Princípios de tirania e mau caratismo! Os céus se dividiram, um
			terço dos anjos acreditou em Ha-Satan e os outros dois terços dos extraterrestres escolheram
			acreditar no Pai.
		</p>
		<p>Para solucionar este impasse, Deus criou o homem e o ensinou o caminho da retidão.</p>
		<p>
			Deus permitiu que Ha-Satan ensinasse a ciência do bem e do mal aos homens, de modo que ao fim
			da história humana, ficará claro para o Universo que Ha-Satan é o grande enganador, o sedutor
			das nações. É ele quem incita os reis da Terra contra os céus.
		</p>
		<p>O Universo é expectador do que acontece em vosso planeta.</p>
		<p>
			O caráter de Deus foi questionado e compete ao homem, mostrar a superioridade do sistema de
			amor do Pai, em face a doutrina do conhecimento do bem e do mal de Ha-Satan.
		</p>
		<p>
			O Verdadeiro Pai enviará o Messias para libertar os viventes da Terra, da abominação que os
			filhos da serpente e o Dragão disseminam no mundo. O Messias venceu o mundo, a besta e seus
			anjos!
		</p>
		<p>
			O Messias é a encarnação da plenitude do arquétipo Filho de Deus manifesto no arquétipo homo
			sapiens.
		</p>
		<p>
			Ha-Satan transou com Eva para arruinar o DNA humano a fim de tornar impossível o nascimento do
			Messias. Mas não pense que o intuito tenha algo relacionado ao prazer sexual. Com tal ato, ele
			introjetou a ciência do bem e do mal na mente do homem através do DNA e tentou arruiná-lo a
			fim de que o nascimento do Messias se tornasse impossível.
		</p>
		<p>Mas nisto, ele também falhou! O Messias nasceu!</p>

		<BookQuote author="Bíblia sagrada" cite="Anônimo">
			<p>
				Porque um menino nos nasceu, um filho se nos deu, e o principado está sobre os seus ombros,
				e se chamará o seu nome: Maravilhoso, Conselheiro, Deus Forte, Pai da Eternidade, Príncipe
				da Paz.
			</p>
		</BookQuote>

		<p>Dessa fornicação diabólica nasceu a primeira tipologia do anticristo, Caim.</p>
		<p>
			O FILHO DO HOMEM destruiu a Matriz escravagista de dentro para fora, depositando sua semente
			no arquétipo homo sapiens e consequentemente no DNA humano!
		</p>

		<BookQuote
			author="Bíblia sagrada"
			cite="Anônimo"
			url="https://www.bibliaonline.com.br/ara/lc/12/49+"
		>
			<p>Eu vim para lançar fogo sobre a terra e bem quisera que já estivesse a arder.</p>
		</BookQuote>

		<p>
			A semente Divina foi enxertada no homem, a fim de concedê-lo vida eterna e no devido tempo, um
			corpo de Luz, um corpo incorruptível para os filhos de Deus!
		</p>
		<p>
			Tal corpo é imune à parasitagem que os seres das trevas praticam contra os seres que estão na
			carne.
		</p>
		<p>
			O Pai foi acusado de ditador; para provar ao Universo que é de fato um Ente democrático,
			concedeu o domínio da Terra ao ser humano; todavia este domínio foi usurpado por meio de
			conexões espirituais energéticas oriundas da magia sexual diretamente perpetrada em Eva e
			indiretamente em Adão.
		</p>

		<BookFigure caption="George Orwel - 1984" src="/image/51XQMRLuGYL.jpg" alt="" />

		<BookQuote
			author="Bíblia sagrada"
			cite="Anônimo"
			url="https://www.bibliaonline.com.br/acf/ef/5/14+"
		>
			<p>
				Por isso diz: Desperta, tu que dormes, e levanta-te dentre os mortos, e Cristo te
				esclarecerá.
			</p>
		</BookQuote>

		<p>A semente da serpente também está na Terra, infelizmente!</p>
		<p>Os monstros que se rebelaram, não entenderam o mistério do cordeiro!</p>
		<p>
			Atente-se para um grande sinal: a monstruosa tribulação será precedida pelo único acordo de
			paz (falsa paz) que será formalizado entre a "descendência de Isaque (judeus)" e a
			"descendência de Ismael (muçulmanos)"! Tal acordo terá duração de 7 anos, porém, na metade
			deste tempo o acordo será rompido e a grande tribulação começará.
		</p>
		<p>Eu testemunho em favor do Soberano do Multiverso:</p>
		<p>Deus é bom e o justo viverá para sempre!</p>
		<p>Vem ser Luz do mundo, sal da Terra!</p>
		<p>Em Deus, tudo podemos!</p>
		<p>
			Nós somos a ordem de Melquisedeque! Nós somos os vencedores! Nós somos um vento! Uma chama
			ardente! Sopramos a nossa doutrina e toda a Terra recebe o Pão da Vida!
		</p>
		<p>
			Nós somos a Verdade! A Palavra Viva! Nós somos uma espada afiada que esmiúça qualquer coisa e
			qualquer um (a)!
		</p>
		<p>Nós somos a noiva e nosso esposo é um Fogo Devorador! Nós somos o Verbo de Deus!</p>
		<p>Não há amor maior que este: dar a vida pelos seus amigos!</p>
		<p>Pelos amigos, vivemos e morremos!</p>
		<p>
			Não nos gloriamos em nós mesmos, mas em Deus, que é a nossa força! Sem Ele, nada podemos
			fazer!
		</p>
		<p>Eu sou Deus, quando Deus está em mim!</p>
		<p>Louvado seja, AQUELE QUE É!</p>

		<BookQuote
			author="Bíblia sagrada"
			cite="Anônimo"
			url="https://www.bibliaonline.com.br/acf/gn/3/15+"
		>
			<p>
				E porei inimizade entre ti e a mulher, e entre a tua semente e a sua semente; esta te ferirá
				a cabeça, e tu lhe ferirás o calcanhar.
			</p>
		</BookQuote>

		<BookFigure
			caption="A semente da mulher e a semente da serpente"
			src="/image/image155.png"
			alt=""
		/>
	</BookChapter>
</template>

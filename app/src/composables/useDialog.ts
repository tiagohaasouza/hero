import { h, render } from 'vue'
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSpacer } from 'vuetify/components'

export interface DialogOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

const defaultOptions: Required<Pick<DialogOptions, 'confirmText' | 'cancelText'>> = {
  confirmText: 'OK',
  cancelText: 'Cancel'
}

function mount(component: any) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(component, container)
  return () => {
    render(null, container)
    container.remove()
  }
}

export function useDialog() {
  function alert(options: DialogOptions): Promise<void> {
    const opts = { ...defaultOptions, ...options }
    return new Promise(resolve => {
      const close = mount(
        h(
          VDialog,
          {
            modelValue: true,
            'onUpdate:modelValue': (val: boolean) => {
              if (!val) {
                cleanup()
                resolve()
              }
            }
          },
          () =>
            h(
              VCard,
              {},
              {
                default: () => [
                  h(VCardTitle, {}, () => opts.title),
                  h(VCardText, {}, () => opts.message),
                  h(
                    VCardActions,
                    {},
                    () => [
                      h(VSpacer),
                      h(
                        VBtn,
                        {
                          onClick: () => {
                            cleanup()
                            resolve()
                          }
                        },
                        () => opts.confirmText
                      )
                    ]
                  )
                ]
              }
            )
        )
      )
      const cleanup = close
    })
  }

  function confirm(options: DialogOptions): Promise<boolean> {
    const opts = { ...defaultOptions, ...options }
    return new Promise(resolve => {
      const close = mount(
        h(
          VDialog,
          {
            modelValue: true,
            'onUpdate:modelValue': (val: boolean) => {
              if (!val) {
                cleanup(false)
              }
            }
          },
          () =>
            h(
              VCard,
              {},
              {
                default: () => [
                  h(VCardTitle, {}, () => opts.title),
                  h(VCardText, {}, () => opts.message),
                  h(
                    VCardActions,
                    {},
                    () => [
                      h(
                        VBtn,
                        {
                          onClick: () => {
                            cleanup(false)
                          }
                        },
                        () => opts.cancelText
                      ),
                      h(VSpacer),
                      h(
                        VBtn,
                        {
                          color: 'primary',
                          onClick: () => {
                            cleanup(true)
                          }
                        },
                        () => opts.confirmText
                      )
                    ]
                  )
                ]
              }
            )
        )
      )
      const cleanup = (result: boolean) => {
        close()
        resolve(result)
      }
    })
  }

  return { alert, confirm }
}

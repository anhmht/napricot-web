const deploy = async (): Promise<any> => {
  try {
    const data = await $api('/config/deploy', {
      method: 'POST',
      body: {}
    })
    return data
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface ConfigService {
  deploy: () => Promise<any>
}

export const $configService: ConfigService = {
  deploy: () => deploy()
}

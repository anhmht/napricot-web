import { errorHandler } from '~/utils/error';

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event);
    const formData = new FormData();

    body?.forEach((value) => {
      if (value.name && value.data) {
        const blob = new Blob([value.data], { type: value.type });
        formData.append(value.name, blob)
      }
    })

    const data = await $fetch(`${process.env.API_URL}/images/upload`, {
      headers: {
        contentType: 'multipart/form-data',
        accept: '*/*',
      },
      method: 'POST',
      body: formData,
    });

    return data;
  } catch (error: any) {
    errorHandler(error)
  }
});
export const randomRate = (min: number, max: number) => {
  return Number((Math.random() * (max - min)).toFixed(1)) + min;
}

export const createPayload = (filter: any, pagination: Pagination) => {
  const payload = {
    ...filter,
    ...pagination
  }
  for (const key in payload) {
    if (payload[key] === null || payload[key] === undefined || payload[key] === '') {
      delete payload[key]
    }
  }
  if (payload.sort === 'createdAt' || !payload.sort) {
    delete payload.sort
  }
  return payload;
}

export const addIdsToHeadings = (htmlString: string): string => {
  // Create a DOM parser
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Find all headings (h1 to h6)
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

  // Iterate over each heading
  headings.forEach((heading) => {
    if (!heading.id && heading.textContent) {
      // Ensure we don't overwrite existing IDs
      // Generate an ID from the heading's text content
      const id = heading.textContent
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/[^\w\-]/g, '') // Remove non-alphanumeric characters
      heading.id = id
    }
  })

  // Return the updated HTML as a string
  return doc.body.innerHTML
}

export const generateUniqSerial= () => {
  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
}

export const sleep = (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

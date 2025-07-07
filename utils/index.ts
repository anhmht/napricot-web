import { CheerioAPI, load } from 'cheerio'

export const randomRate = (min: number, max: number) => {
  return Number((Math.random() * (max - min)).toFixed(1)) + min
}

export const createPayload = (filter: any, pagination: Pagination) => {
  const payload = {
    ...filter,
    ...pagination
  }
  for (const key in payload) {
    if (
      payload[key] === null ||
      payload[key] === undefined ||
      payload[key] === ''
    ) {
      delete payload[key]
    }
  }
  if (payload.sort === 'createdAt' || !payload.sort) {
    delete payload.sort
  }
  return payload
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

export const generateUniqSerial = () => {
  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {
    const r = Math.floor(Math.random() * 16)
    return r.toString(16)
  })
}

export const sleep = (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export const extractTocIds = (html: string): string[] => {
  // Load the HTML into Cheerio
  const $: CheerioAPI = load(html)

  // Select <h2> to <h6> elements and extract their IDs
  const ids: string[] = []
  $('h2, h3, h4, h5, h6').each((_, element) => {
    const id = $(element).attr('id')
    if (id) {
      ids.push(id) // Add the ID if it exists
    }
  })

  return ids
}

/**
 * Creates a debounced function that delays invoking the provided function until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), wait)
  }
}

/**
 * Converts HTML entities to their corresponding characters
 *
 * @param str - The string to unescape
 * @returns The unescaped string
 */
export const unescape = (str: string): string => {
  if (typeof str !== 'string') return str

  const htmlEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '=',
    '&apos;': "'",
    '&nbsp;': ' '
  }

  return str.replace(
    /&(?:amp|lt|gt|quot|#x27|#x2F|#x60|#x3D|apos|nbsp);/g,
    (match) => {
      return htmlEntities[match] || match
    }
  )
}

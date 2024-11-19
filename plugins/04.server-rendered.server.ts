import { defineNuxtPlugin } from '#app';
import { CheerioAPI, load } from 'cheerio';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:rendered', (htmlContext) => {
    if (!htmlContext.renderResult?.html) return;

    // Load the HTML body into Cheerio
    const $: CheerioAPI = load(htmlContext.renderResult?.html);

    // Find all <img> tags without width/height attributes
    $('img:not([width]):not([height])').each((_, img) => {
      const $img = $(img);

      // Add placeholders and optional data attributes
      $img.attr('data-width', 'auto');
      $img.attr('data-height', 'auto');
    });

    // Replace the body HTML with the modified version
    htmlContext.renderResult.html = $.html();
  });
});

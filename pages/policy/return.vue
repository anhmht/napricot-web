<template>
  <div :class="$style.root">
    <div class="container">
      <div :class="$style.return">
        <h1>Return Policy</h1>
        <p>
          We are committed to offering a diverse array of products with unique
          materials to help you celebrate special moments, share your personal
          stories, or gift to your loved ones. Our team is well-trained and we
          work closely with our strategic partners to ensure a professional yet
          highly personalized customer experience.
        </p>
        <p>
          If you are not satisfied with your order for any reason, please
          contact us. We address issues on a case-by-case basis to ensure your
          satisfaction.
        </p>
        <p>
          To reach our support team, click
          <NuxtLink to="/help/contact">here</NuxtLink> within 21 days of
          receiving your product. Providing detailed information will help us
          resolve the issue more efficiently. To expedite your request, please
          include the following:
        </p>
        <ul>
          <li>Name on the order</li>
          <li>Your order number</li>
          <li>A detailed description of the problem</li>
          <li>Photos illustrating the issue</li>
          <li>Whether you prefer a replacement or a refund</li>
        </ul>
        <p>
          Please note that we are not responsible for customer errors such as
          spelling or grammatical mistakes, poor quality of original images, or
          ordering errors. Be sure to review your orders carefully before
          placing them.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.root {
  position: relative;
  h1 {
    margin-bottom: 32px;
  }
  p {
    margin-bottom: 24px;
  }
  li {
    font-weight: 400;
  }
  a {
    color: var(--color-primary);
    text-decoration: none;
    &:hover {
      opacity: 0.8;
    }
  }
}
.return {
  padding: 24px 0;
  @media (max-width: 1120px) {
    padding: 16px;
  }
}
</style>

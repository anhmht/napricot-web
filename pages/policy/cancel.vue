<template>
  <div :class="$style.root">
    <div class="container">
      <div :class="$style.cancel">
        <h1>Cancellation & Modification Policy</h1>
        <p>
          If you decide to change your mind about your purchase, please contact
          us here and provide your order number along with the desired
          modification. We will confirm the changes or cancellation once they
          have been processed.
        </p>
        <p>
          Please note that your order can only be cancelled or modified within
          <strong>2 hours</strong> of placement. After this period, the order is
          locked for processing and cannot be altered or cancelled.
        </p>
        <p><strong>Important Information:</strong></p>
        <p>
          During the holiday season, design modifications may extend processing
          times, and we cannot guarantee timely delivery for orders requiring
          such changes.
        </p>
        <p>
          <strong
            >NOTE: Please keep in mind that purchasing means accepting all the
            terms mentioned above.</strong
          >
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
}
.cancel {
  padding: 24px 0;
  @media (max-width: 1120px) {
    padding: 16px;
  }
}
</style>

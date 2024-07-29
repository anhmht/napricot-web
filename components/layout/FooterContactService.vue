<template>
  <div :class="$style.serviceContact">
    <div :class="[$style.container, 'container']">
      <h4>Services & Contact</h4>
      <div :class="$style.service">
        <i class="icon-person" />
        <div>
          <h6>Arrange quickly in your account</h6>
          <p>
            Track <NuxtLink to="/order">your order</NuxtLink>, pay invoices or
            return an item.
          </p>
        </div>
      </div>
      <div :class="$style.contact">
        <i class="icon-contact-support" />
        <div>
          <h6>Do you need us?</h6>
          <p>
            We are happy to <NuxtLink to="/help">help you</NuxtLink>. Our
            customer service is open day and night.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.serviceContact {
  position: relative;
  padding: 36px 0;
  background-color: var(--color-background-secondary);
  color: #fff;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    font-size: 4.8rem;
    color: var(--color-primary);
  }
  h6 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 4px;
  }
  p {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 24px;
  }
  a {
    color: #fff;
    font-weight: 700;
    text-decoration: underline;
    &:hover {
      color: var(--color-primary);
    }
  }
}
.service {
  display: flex;
  align-items: center;
  width: 340px;
  gap: 16px;
}
.contact {
  display: flex;
  align-items: center;
  width: 354px;
  gap: 16px;
}
</style>

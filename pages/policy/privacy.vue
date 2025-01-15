<template>
  <div :class="$style.root">
    <div class="container">
      <div :class="$style.privacy">
        <h1>Privacy Policy</h1>
        <h2>Introduction</h2>
        <p>
          Welcome to Napricot.com ("we," "our," "us"). We are dedicated to
          protecting your privacy and ensuring that your personal information is
          handled safely and responsibly. This Privacy Policy explains how we
          collect, use, and protect your information when you visit our website
          and use our services.
        </p>
        <h2>Information We Collect</h2>
        <p>
          <strong>Personal Information:</strong> We collect personal information
          that you voluntarily provide to us, including but not limited to:
        </p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Shipping and billing address</li>
          <li>Phone number</li>
          <li>Payment information</li>
        </ul>
        <p>
          <strong>Non-Personal Information:</strong> We also collect
          non-personal information automatically when you visit our website,
          such as:
        </p>
        <ul>
          <li>IP address</li>
          <li>Browser type</li>
          <li>Operating system</li>
          <li>Pages visited on our website</li>
          <li>Time and date of visit</li>
        </ul>
        <h2>How We Use Your Information</h2>
        <p>
          The information we collect is used for various purposes, including:
        </p>
        <ul>
          <li>
            <strong>Processing Orders:</strong> To process and fulfill your
            orders, including sending order confirmations, shipping
            notifications, and handling returns and exchanges.
          </li>
          <li>
            <strong>Customer Service:</strong> To provide customer support and
            respond to your inquiries.
          </li>
          <li>
            <strong>Personalization:</strong> To personalize your shopping
            experience and recommend products that may be of interest to you.
          </li>
          <li>
            <strong>Marketing:</strong> To send you promotional emails,
            newsletters, and special offers that you have opted in to receive.
            You can opt out of these communications at any time.
          </li>
          <li>
            <strong>Improvement:</strong> To analyze and improve our website,
            products, and services.
          </li>
          <li>
            <strong>Security:</strong> To protect against fraudulent activities
            and ensure the security of our website.
          </li>
        </ul>
        <h2>Sharing Your Information</h2>
        <p>
          We do not sell, trade, or transfer your personal information to
          outside parties except as described below:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> We may share your information
            with trusted third-party service providers who assist us in
            operating our website, conducting our business, or servicing you.
            These parties are obligated to keep your information confidential.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your
            information if required to do so by law or in response to valid
            requests by public authorities (e.g., a court or government agency)
          </li>
        </ul>
        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience on our website. Cookies are small data files stored on your
          device that help us understand how you use our site and provide you
          with a personalized experience.
        </p>
        <h2>Types of Cookies We Use:</h2>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Necessary for the operation of
            our website.
          </li>
          <li>
            <strong>Performance Cookies:</strong> Help us understand how
            visitors interact with our website by collecting and reporting
            information anonymously.
          </li>
          <li>
            <strong>Functional Cookies:</strong> Allow us to remember your
            preferences and provide enhanced features.
          </li>
          <li>
            <strong>Targeting Cookies:</strong> Used to deliver ads relevant to
            you and your interests.
          </li>
        </ul>
        <p>
          You can manage your cookie preferences through your browser settings.
          Please note that disabling cookies may affect the functionality of our
          website.
        </p>
        <h2>Security</h2>
        <p>
          We implement a variety of security measures to protect your personal
          information. These include physical, electronic, and administrative
          safeguards to prevent unauthorized access, use, or disclosure of your
          information.
        </p>
        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, and delete your personal
          information. You can do this by logging into your account on our
          website or by contacting us directly. You also have the right to opt
          out of receiving marketing communications from us at any time.
        </p>
        <h2>Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices of these websites. We encourage
          you to read the privacy policies of any third-party site you visit.
        </p>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          significant changes by posting the updated policy on our website.
        </p>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at: <NuxtLink to="/help/contact">here</NuxtLink>
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
  h2 {
    font-size: 2.5rem;
    margin-bottom: 24px;
  }
  p {
    margin-bottom: 24px;
  }
  li {
    font-weight: 400;
  }
  a {
    color: var(--color-primary);
    text-decoration: underline;
    &:hover {
      opacity: 0.8;
    }
  }
}
.privacy {
  padding: 24px 0;
  @media (max-width: 1120px) {
    padding: 16px;
  }
}
</style>

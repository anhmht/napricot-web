<template>
  <div :class="$style.root">
    <div class="container">
      <div :class="$style.shipping">
        <h1>Shipping And Delivery Policy</h1>
        <p>
          All products offered on Napricot are made-to-order. When you place an
          order, we print the items specifically for you, ensuring the highest
          quality!
        </p>
        <p>
          Although a portion of our products is printed in-house at our US
          facilities, we also source from global suppliers to provide a wider
          variety of merchandise. We collaborate only with vendors who adhere to
          our strict quality control standards, which is why delivery times can
          vary as outlined below.
        </p>
        <p><strong>Shipping carriers:</strong> USPS, DHL, EMS, Local Post.</p>
        <p>Orders are processed upon payment acceptance.</p>
        <h2>Estimate Time Of Arrival</h2>
        <p>
          Orders are processed on business days, from Monday to Friday, Eastern
          Standard Time, excluding holidays observed by the Post Office: New
          Year's Day, Presidents' Day, Memorial Day, Independence Day, Labor
          Day, Thanksgiving, and Christmas.
        </p>
        <p>
          To estimate when your order will arrive, refer to the time frames
          below for our most popular products:
        </p>
        <p>
          <strong>Production time:</strong> The time your order spends in the
          production queue until it is produced can vary daily based on overall
          order volume.
        </p>
        <table :class="$style.product">
          <thead>
            <tr>
              <th>Product</th>
              <th>Production Time (business days)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.name">
              <td>{{ product.name }}</td>
              <td>{{ product.time }}</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Shipping time:</strong> Delivery times depend on your
          location. While we work closely with our logistics partners to provide
          accurate delivery information, delivery times are estimates and cannot
          be guaranteed. Once your products are in transit, any delays are
          beyond our control.
        </p>
        <table :class="$style.carrier">
          <thead>
            <tr>
              <th>Country</th>
              <th>Carrier</th>
              <th>Shipping Time (business days)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="carrier in carriers" :key="carrier.country">
              <td>{{ carrier.country }}</td>
              <td>{{ carrier.carrier }}</td>
              <td>{{ carrier.time }}</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Please note:</strong></p>
        <ul>
          <li>
            Canvas, Bumper Plate Keychain/Ornament products are only available
            in the US.
          </li>
          <li>
            Canvas, Poster, and Metal Sign packages cannot be delivered to PO
            boxes.
          </li>
          <li>
            When your order is ready to ship, a tracking link will be sent to
            your email to follow your package's journey.
          </li>
          <li>
            For personalized orders or those requiring modifications, additional
            design time may be required based on the complexity of the request.
          </li>
        </ul>
        <p>
          <strong>ORDER TRACKING</strong> Once shipped, you will receive email
          notifications and can log in to our website for real-time tracking.
          Note that some orders may be sent in multiple parcels, resulting in
          multiple emails and tracking numbers.
        </p>
        <p>
          Please allow 5-7 days for the carrier to scan your package into their
          system. If no tracking information is available, it means the carrier
          has not yet processed your parcel. Tracking events will appear on the
          tracking page once the parcel is scanned into the system.
        </p>
        <p>
          If it is past your estimated arrival date, please contact us, and we
          will assist you.
        </p>
        <p>
          <strong>INCORRECT ADDRESS</strong> Ensure you provide the correct
          address at checkout:
        </p>
        <ul>
          <li>
            If we detect incorrect or missing information, we may need to
            contact you to update the delivery details, which could delay your
            order.
          </li>
          <li>
            We are not responsible for orders delivered to the wrong address or
            returned to sender. Orders will be returned to our shipping
            partners’ warehouses and disposed of by them. Check your given
            shipping address before reaching out to customer support.
          </li>
          <li>
            For orders returned due to an incorrect address provided, we request
            a re-shipping fee to resend your order.
          </li>
          <li>
            If you contact the carrier after the order leaves our warehouse to
            forward or redirect your parcel, we are not responsible if it gets
            lost, stolen, or damaged.
          </li>
        </ul>
        <p>
          Customer satisfaction is our top priority, and we will do whatever we
          can to take care of you. Thank you for choosing napricot.com, and if
          you have any questions, please don't hesitate to
          <NuxtLink to="/help/contact">contact us</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const products = ref([
  { name: 'Apparel', time: '3 - 5' },
  { name: 'Mug', time: '3 - 5' },
  { name: 'Tumbler', time: '3 - 5' },
  { name: 'Pillow', time: '3 - 5' },
  { name: 'Canvas', time: '3 - 5' },
  { name: 'Poster', time: '3 - 5' },
  { name: 'Fleece Blanket', time: '3 - 5' },
  { name: 'Acrylic Plaque', time: '3 - 5' },
  { name: 'Round Wood Sign', time: '5 - 7' },
  { name: 'Metal Sign', time: '5 - 7' },
  { name: 'Ornament', time: '5 - 7' },
  { name: 'Others', time: '5 - 7' }
])

const carriers = ref([
  { country: 'US', carrier: 'USPS/ UPS/ DHL Ecommerce', time: '7 - 12' },
  {
    country: 'EU',
    carrier: 'DHL/ PostNL/ Bpost/ La Poste/ Colis/ Privé/ Correos/ SDA',
    time: '10 - 20'
  },
  { country: 'CA', carrier: 'Canada Post', time: '7 - 15' },
  { country: 'AU', carrier: 'Australia Post', time: '7 - 15' },
  { country: 'Others', carrier: 'UPS/ DHL international', time: '10 - 20' }
])
</script>

<style lang="postcss" module>
.root {
  position: relative;
  h1 {
    margin-bottom: 32px;
  }
  h2 {
    font-size: 2.5rem;
    margin-bottom: 16px;
  }
  p {
    margin-bottom: 24px;
  }
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    margin: auto;
  }
  th {
    padding: 16px 0;
  }
  td {
    padding: 16px 0;
    font-weight: 400;
    text-align: center;
  }
  table {
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
.shipping {
  padding: 24px 0;
  @media (max-width: 1120px) {
    padding: 16px;
  }
}
.product {
  th {
    width: 500px;
  }
}
.carrier {
  th {
    width: 335px;
  }
}
</style>

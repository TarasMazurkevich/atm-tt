<template>
  <b-container class="bv-example-row mt-20">
    <b-row>
      <b-col class="mt-20" cols="12" md="6">
        <b-card header="ATM Full Data">
          <atm-banknote-list />
          <p class="card-text mt-2">
            ATM Balance = {{ BALANCE }}
          </p>
          <p class="card-text mt-2">
            ATM Withdrawal Limit = {{ WITHDRAWAL_LIMIT }}
          </p>
        </b-card>
      </b-col>
      <b-col class="mt-20" cols="12" md="6">
        <atm-transaction-form />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <atm-transaction-history />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['BALANCE', 'WITHDRAWAL_LIMIT'])
  }
}
</script>

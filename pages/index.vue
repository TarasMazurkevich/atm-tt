<template>
  <b-container class="bv-example-row mt-20">
    <b-row>
      <b-col class="mt-20" cols="12" md="6">
        <atm-banknote-list />
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

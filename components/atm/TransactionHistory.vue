<template>
  <b-table
    striped
    bordered
    hover
    dark
    fixed
    :items="tableItems"
    :fields="tableFields"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    tableFields () {
      return ['sum', ...this.BANKNOTES.map(item => item.nominal.toString())]
    },
    tableItems () {
      return this.TRANSACTION_HISTORY.map((transaction) => {
        const banknotesToObject = {}
        transaction.banknotes.forEach((banknote) => {
          banknotesToObject[banknote.nominal] = banknote.count
        })
        return {
          sum: transaction.sum,
          ...banknotesToObject
        }
      })
    },
    ...mapGetters(['TRANSACTION_HISTORY', 'BANKNOTES'])
  }
}
</script>

<template>
  <b-form @submit.prevent>
    <b-form-group>
      <b-form-radio-group>
        <b-form-radio
          v-for="(variant, i) in DEFAULT_WITHDRAWAL_VARIANTS"
          :key="`variant-${i}`"
          v-model="query"
          name="variant"
          :value="variant"
        >
          {{ variant }}
        </b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <b-form-group>
      <b-row>
        <b-col>
          <b-form-input v-model="$v.query.$model" :state="!$v.query.$error" type="number" />
        </b-col>
        <b-col>
          <b-button :disabled="$v.query.$error" variant="primary" @click="giveOutMoney">
            Give Out
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minValue, maxValue } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    query: 10
  }),
  computed: {
    ...mapGetters(['BANKNOTES', 'BALANCE', 'WITHDRAWAL_LIMIT', 'DEFAULT_WITHDRAWAL_VARIANTS'])
  },
  validations () {
    const isMultipleOfTen = this.validationMultipleOfTen
    return {
      query: {
        required,
        minValue: minValue(10),
        maxValue: maxValue(this.WITHDRAWAL_LIMIT),
        isMultipleOfTen
      }
    }
  },
  methods: {
    giveOutMoney () {
      if (this.matchQueryWithBalance() && this.checkBalance()) {
        const vm = this
        let queryClone = this.query
        const transactionSum = queryClone
        const transactionUsedBanknotes = []

        this.BANKNOTES.forEach((currentBanknote) => {
          const currentBanknoteCountForQuery = Math.floor(queryClone / currentBanknote.nominal)

          if (queryClone > 0 && currentBanknoteCountForQuery >= 1 && currentBanknote.count > 0) {
            if (currentBanknoteCountForQuery <= currentBanknote.count && vm.reduceMoney(queryClone, currentBanknote.nominal * currentBanknoteCountForQuery)) {
              queryClone -= currentBanknote.nominal * currentBanknoteCountForQuery
              vm.$store.commit('SUBTRACT_BANKNOTES', {
                selectedNominal: currentBanknote.nominal,
                countToDescrease: currentBanknoteCountForQuery
              })
              transactionUsedBanknotes.push({ nominal: currentBanknote.nominal, count: currentBanknoteCountForQuery })
            } else if (currentBanknoteCountForQuery > currentBanknote.count && vm.reduceMoney(queryClone, currentBanknote.nominal * currentBanknote.count)) {
              queryClone -= currentBanknote.nominal * currentBanknote.count
              vm.$store.commit('SUBTRACT_BANKNOTES', {
                selectedNominal: currentBanknote.nominal,
                countToDescrease: currentBanknote.count
              })
              transactionUsedBanknotes.push({ nominal: currentBanknote.nominal, count: currentBanknote.count })
            } else {
              return false
            }
          } else {
            return false
          }
        })

        this.$store.commit('ADD_TRANSACTION_TO_HISTORY', { sum: transactionSum, banknotes: transactionUsedBanknotes })
      }
    },
    reduceMoney (money, valueToDescrease) {
      return money - valueToDescrease >= 0
    },
    checkBalance () {
      return this.BALANCE > 0
    },
    matchQueryWithBalance () {
      return this.BALANCE - this.query >= 0
    },
    validationMultipleOfTen (value) {
      return value % 10 === 0
    }
  }
}
</script>

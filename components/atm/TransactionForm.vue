<template>
  <b-form class="atm-form" @submit.prevent>
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
      if (this.checkBalance() && this.matchQueryWithBalance()) {
        const vm = this
        let queryClone = this.query
        const transactionSum = queryClone
        const transactionUsedBanknotes = []

        this.BANKNOTES.forEach((currentBanknote) => {
          const currentBanknoteCountForQuery = Math.floor(queryClone / currentBanknote.nominal)

          if (queryClone > 0 && currentBanknoteCountForQuery >= 1 && currentBanknote.count > 0) {
            if (currentBanknoteCountForQuery <= currentBanknote.count && vm.reduceMoney(queryClone, currentBanknote.nominal * currentBanknoteCountForQuery)) {
              queryClone -= currentBanknote.nominal * currentBanknoteCountForQuery
              transactionUsedBanknotes.push({ nominal: currentBanknote.nominal, count: currentBanknoteCountForQuery })
              vm.$store.commit('SUBTRACT_BANKNOTES', {
                selectedNominal: currentBanknote.nominal,
                countToDescrease: currentBanknoteCountForQuery
              })
            } else if (currentBanknoteCountForQuery > currentBanknote.count && vm.reduceMoney(queryClone, currentBanknote.nominal * currentBanknote.count)) {
              queryClone -= currentBanknote.nominal * currentBanknote.count
              transactionUsedBanknotes.push({ nominal: currentBanknote.nominal, count: currentBanknote.count })
              vm.$store.commit('SUBTRACT_BANKNOTES', {
                selectedNominal: currentBanknote.nominal,
                countToDescrease: currentBanknote.count
              })
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
      if (this.BALANCE > 0) {
        return true
      } else {
        this.$bvToast.toast('The ATM no longer has funds!', {
          title: 'ERROR !',
          variant: 'danger',
          solid: true
        })
        return false
      }
    },
    matchQueryWithBalance () {
      if (this.BALANCE - this.query >= 0) {
        return true
      } else {
        this.$bvToast.toast('The balance in the ATM is not enough to withdraw funds! Please enter a different amount!', {
          title: 'ERROR !',
          variant: 'danger',
          solid: true
        })
        return false
      }
    },
    validationMultipleOfTen (value) {
      return value % 10 === 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .atm-form {
    margin-top: 20px;
  }
</style>

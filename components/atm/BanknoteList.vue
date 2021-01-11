<template>
  <b-list-group>
    <b-list-group-item
      v-for="(banknote, i) in sortedBanknotes"
      :key="`atm-banknote-${i}`"
    >
      <b-row>
        <b-col>
          <b-icon icon="cash" /> {{ banknote.nominal }}
        </b-col>
        <b-col class="text-right">
          <b-badge :variant="calculateBgVariant(banknote.count)">
            {{ banknote.count }}
          </b-badge>
        </b-col>
      </b-row>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    sortedBanknotes () {
      const banknotesClone = [...this.BANKNOTES]
      return banknotesClone.sort((current, next) => current.nominal < next.nominal ? 1 : -1)
    },
    ...mapGetters(['BANKNOTES'])
  },
  methods: {
    calculateBgVariant (banknoteCount) {
      if (banknoteCount <= 0) {
        return 'secondary'
      } else if (banknoteCount < 5) {
        return 'danger'
      } else {
        return 'primary'
      }
    }
  }
}
</script>

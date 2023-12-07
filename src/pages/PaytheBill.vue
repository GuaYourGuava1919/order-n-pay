<template>
  <div>
    <div class="q-pa-md">
      <div class="q-py-md text-h6 text-primary text-weight-bold">應收帳款Credit</div>
      <q-table
      :data="accountsReceivable"
      :columns="columns"
      row-key="payableItems"
      hide-pagination
    >
      <template v-slot:body="props" >
        <q-tr :props="props" class="text-primary">
          <q-td key="debtor" :props="props">
            {{ props.row.debtor }}
          </q-td>
          <q-td key="payableItems" :props="props">
            {{ props.row.payableItems }}
          </q-td>
          <q-td key="amountsPayable" :props="props">
            {{ props.row.amountsPayable }}
          </q-td>
          <q-td key="repaymentStatus" :props="props">
            {{ props.row.repaymentStatus }}
          </q-td>
          <q-td key="collection" :props="props">
            <q-btn color="secondary" label="收款" />
          </q-td>
          <q-td key="offset" :props="props">
            <q-btn color="dark" label="抵銷" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </div>
    <div class="q-pa-md">
      <div class="q-py-md text-h6 text-primary text-weight-bold">應付帳款Debt</div>
    </div>


  </div>
</template>

<script>
  export default {
    data(){
      return{
        columns: [
        {
          name: 'debtor',
          required: true,
          label: '債務人',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        { name: 'payableItems', label: '應付項目', sortable: true , field: row => row.payableItems, align: 'left' },
        { name: 'amountsPayable', label: '應付金額', sortable: true , field: row => row.amountsPayable , align: 'left'},
        { name: 'repaymentStatus',label: '還款狀態', field: row => row.repaymentStatus, sortable: true, align: 'left' },
        { name: 'collection', label: '確認收款',  field: 'collection', sortable: true, align: 'left'},
        { name: 'offset', label: '抵銷款項', field: '' },
      ],
      accountsReceivable: [
        {
          debtor: '王小明',
          payableItems: '2023/12/07-胡椒海鹽雞胸',
          amountsPayable: 1000,
          repaymentStatus: false,
        },
        {
          debtor: '王小明',
          payableItems: '2023/12/07-皮蛋瘦肉粥',
          amountsPayable: 1000,
          repaymentStatus: false,
        }
      ],
      }
    },

  }
</script>

<style scoped>

</style>

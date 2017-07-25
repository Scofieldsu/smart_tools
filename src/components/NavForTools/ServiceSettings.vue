<template>

</template>
<script>
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  export default {
    components: {ElInput},
    data () {
      return {
        activeName: 'first',
        api_url: ''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>

<style scoped>
  .api_url {
    width: 500px;
    margin: 20px 0 20px 20px;
  }

</style>

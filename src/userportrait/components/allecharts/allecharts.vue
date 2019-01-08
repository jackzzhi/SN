<template>
    <div>
      <customer-description v-if="chartData.displayMode==='10'" :chartData="chartData"></customer-description>
      <age-distribution v-if="chartData.displayMode==='42'" :chartData="chartData" :colorData="colorData"></age-distribution>
      <gender-distribution v-if="chartData.displayMode==='24'" :chartData="chartData" :colorData="colorData"></gender-distribution>
      <marriageDistribution v-if="chartData.displayMode==='44'" :chartData="chartData" :colorData="colorData"></marriageDistribution>
      <xueli-distribution v-if="chartData.displayMode==='41'" :chartData="chartData" :colorData="colorData"></xueli-distribution>
      <circlePush v-if="chartData.displayMode==='71'" :chartData="chartData" :colorData="colorData"></circlePush>
    </div>
</template>

<script>
  import customerDescription from '../../components/customerDescription'
  import ageDistribution from '../../components/echarts/ageDistribution'
  import marriageDistribution from '../echarts/marriageDistribution'
  import circlePush from '../../components/echarts/circlePush'
  import GenderDistribution from "../echarts/genderDistribution";
  import xueliDistribution from "../../components/echarts/xueliDistribution";
    export default {
      props:{
        chartData:{
          required:true
        },
        colorData:String
      },
      components:{
       xueliDistribution,
       customerDescription,
       ageDistribution,
       GenderDistribution,
       marriageDistribution,
       circlePush,
     }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

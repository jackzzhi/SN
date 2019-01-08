<template>
    <div class="pageRoute">
        <div v-for="item in $router.options.routes" :key="item.path">
            <router-link :to="item.path">{{item.name||item.path}}</router-link>
            </br>
            <div class="children" v-for="items in item.children" :key="items.path">
                <router-link :to="items.path">{{items.name||items.path}}</router-link>
                </br>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            document.title="页面路由";
        }
    }
</script>


<style lang="less" scoped>
    .pageRoute{
        padding:20px;
        text-align: left;
        a{
            display: inline-block;
            padding: 0 5px;
            margin: 7px 0;
            line-height: 26px;
            background: #4e97ff;
            border-radius: 4px;
            color: #fff;
        }
        .children{
            padding-left:30px;
        }
    }
</style>


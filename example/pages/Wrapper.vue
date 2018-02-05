<template>
    <div>
        <div class="brand">
            <img src="/vu-tinymce-logo.png" alt="vu-tinymce">
        </div>
        <section class="container">
            <ul class="nav">
                <li><router-link to="/home">How to use</router-link></li>
                <li>
                    <span>Example:</span>
                    <ul>
                        <li><router-link to="/home">Add button</router-link></li>
                        <li><router-link to="/home">Insert image</router-link></li>
                        <li><router-link to="/home">Insert emotions</router-link></li>
                    </ul>
                </li>
            </ul>
            <router-view></router-view>
        </section>
    </div>
</template>
<style>
.code{
    background-color: #f3f3f3;
    border-radius: 5px;
    display: block;
    padding: 1em;
    line-height: 1.5em;
}
</style>
<style scoped>
    .container{
        width: 960px;
        margin: 0 auto;
    }
    .brand > img{
        display: block;
        margin: 0 auto;
    }
    .nav{
        padding-left: 0;
        text-align: center;
    }
    .nav li{
        display: inline;
        margin-left:1em;
        margin-right:1em;
    }
    .nav li>ul{
        list-style: none;
        display: inline;
        padding: 0;
        background-color: #f2f2f2;
    }
    .nav li>ul>li{
        margin-left: .5em;
        margin-right: .5em;
    }
</style>
<script>
export default {
}
</script>

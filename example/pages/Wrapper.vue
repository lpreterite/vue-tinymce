<template>
    <section class="container">
        <nav class="side">
            <div class="brand">
                <img src="/vu-tinymce-logo.png" alt="vu-tinymce">
            </div>
            <ul class="nav">
                <li><router-link to="/home">How to use</router-link></li>
                <li>
                    <span>Example:</span>
                    <ul>
                        <li><router-link to="/insert-image">Insert image</router-link></li>
                        <li><router-link to="/serialize-or-parse-emotions-content">Serialize or parse emotions content</router-link></li>
                        <li><router-link to="/other-style">Other Style</router-link></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div class="main">
            <div class="inner">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>
<style>
body{
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
}
img{
    max-width: 100%;
}
.hljs{
    border-radius: 5px;
    padding: 1.5em 1.25em;
}
.code{
    background-color: #f3f3f3;
    border-radius: 5px;
    display: block;
    padding: 1em;
    line-height: 1.5em;
}
.btn{
    display: inline-block;
    background-color: #41b883;
    color: #f1f1f1;
    padding: .25em .865em;
    border-radius: 3px;
    font-style: normal;
    text-decoration: unset;
}
</style>
<style lang="css" scoped>
    .container{
        display: flex;
        align-items: stretch;
    }
    .side{
        background: #fff;
        min-width: 300px;
    }
    .main{
        background: #fff;
        overflow: auto;
        padding: 1em;
        flex-grow: 1;
    }
    .inner{
        width: 786px;
        margin: 0 auto;
    }
    .brand > img{
        display: block;
        margin: 0 auto;
    }
    .nav{
        padding-left: 2em;
        text-align: left;
    }
    .nav li{
        margin:1em 0;
    }
    .nav li>ul{
        padding-left: 2em;
        list-style: none;
        display: inline;
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

<template>
    <div class="tunnel-container">
        <!-- tree结构模型 start -->
        <div class="tree">
            <div class="title">
                <h3>选择切面</h3>
            </div>
            <el-tree :props="defaultProps" :load="loadNode" lazy @node-click="handleNodeClick" />
        </div>
        <!-- tree结构模型 end -->
        <!-- tree节点对应内容 start -->
        <div class="tree-content">
            <!-- content start -->
            <el-table :data="treeContent.list" stripe style="width: 100%" :max-height="currentInnerHeight">
                <el-table-column prop="id" label="序号" />
                <el-table-column prop="tunnelname" label="隧道名称" />
                <el-table-column prop="imagename" label="图名" />
                <el-table-column prop="num" label="图号" />
                <el-table-column label="操作" width="200px">
                    <template #default="scope">
                        <el-button type="primary" @click="previewHandle(scope.row)" :disabled=" scope.row.url === '' ? true : false">预览</el-button>
                        <el-button type="warning" @click="uploadHandle(scope.$index,scope.row)">上传</el-button>
                    </template>
                </el-table-column>
            <!-- content end -->
            </el-table>
            <!-- 上传对话框 start -->
            <div>
                <el-dialog 
                    v-model="dialogUploadVisible" 
                    title="上传文件" 
                    width="700"
                >
                <!-- 文件选择模块 start -->
                    <el-upload 
                        v-model:file-list="fileList" 
                        class="upload" 
                        action="http://localhost:3000/api/upload"
                        :limit="1" 
                        :on-exceed="handleExceed"
                        drag
                        :on-success="handleSuccess"
                    >
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                        拖拽放入文件<em>或者点击上传</em>
                        </div>
                        <template #tip></template>
                    </el-upload>
                <!-- 文件选择模块 end -->
                </el-dialog>
            </div>
            <!-- 上传对话框 end -->
        </div>
        <!-- tree节点对应内容 end -->
    </div>
</template>
<script setup>
    import api from '@/api/index.js';
    import { reactive, ref, onMounted } from 'vue';
    import { UploadFilled } from '@element-plus/icons-vue'
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router';


  
    /**
     * 初始化
     */
    //useRouter初始化
    const router = useRouter(); 
    // 上传对话框初始化
    const dialogUploadVisible = ref(false);
    //tree节点内容初始化
    const treeContent = reactive({
        list: []
    });
    //上传文件栏初始化
    const fileList = reactive([]);
    //获取当前上传文件的id号
    const currentID = ref(0);
    //获取窗口高度初始化
    const currentInnerHeight = ref(window.innerHeight - 130);
    onMounted(() => {
        window.addEventListener('resize', () => {
            currentInnerHeight.value = window.innerHeight - 130;
        });
    });

    /**
     * //节点懒加载函数
     */
    const loadNode = (node, resolve) => {
        //tree-一级渲染
        if (node.level === 0) {
            api.getTunnelList().then(res => {
                if (res.data.status == 200) {
                    resolve(res.data.result)
                } else {
                    console.log(res.data.msg);
                    resolve([]);
                }
            })
        }

        //tree-一级渲染
        if (node.level === 1) {
            // console.log(node.data.cid);
            api.getTunnelListChild({ cid: node.data.cid }).then(res => {
                if (res.data.status == 200) {
                    resolve(res.data.result)
                } else {
                    console.log(res.data.msg);
                    resolve([]);
                }
            })
        }

        //处理多级
        if (node.level > 1) {
            resolve([])
        }

    }

    /**
     * //节点点击触发Handle
     */
    const handleNodeClick = (data) => {
        if (data.content != undefined) {
            api.getTunnelContent({ content: data.content }).then(res => {
                if (res.data.status === 200) {
                    treeContent.list = res.data.result;
                } else {
                    console.log(res.data.msg);
                }
            })
        }

    }


    
    /**
     * tree元素 
     * 指定节点标签为节点对象的某个属性值
     * 指定子树为节点对象的某个属性值
     */
    const defaultProps = {
        children: 'children',
        label: 'name',
    }

    /**
     * 表格上传按钮 Handle
     */
    const uploadHandle = (index,row) =>{
        dialogUploadVisible.value = true
        currentID.value = row.id;
    }

    /**
     * 上传文件栏超出数量触发 Handle
     */
    const handleExceed = (files, uploadFiles) => {
        ElMessage.warning(
            `最多上传1个文件 当前文件数量：${files.length}`
        )
    }
    
    /**
     * 上传文件成功触发 Handle
     */
    const handleSuccess = (response,uploadFile) =>{
        api.getUpdateContentUrl({url:response.url.substr(7),id:currentID.value}).then(res =>{
            if(res.data.status === 200){
                ElMessage({
                    message: res.data.msg,
                    type: 'success',
                })
            }else{
                ElMessage.error(res.data.msg)
            }
        }).catch(error =>{
            console.log(error);
        })
    }

    /**
     * 预览按钮Handle
     */
    const previewHandle = (row) =>{
        router.push({name:'pdf',params:{id:row.id}});
    }
</script>
<style scoped>
.tunnel-container {
    display: flex;
}

/* tree结构 */
.tree {
    background-color: #fff;
    width: 300px;
    height: 92vh;
}

/* tree标题 */
.tree .title {
    box-sizing: border-box;
    border-bottom: 1px solid black;
}

/* tree标题文字 */
.tree h3 {
    padding: 10px;
}

/* 节点内容 */
.tree-content {
    flex: 1;
    background-color: #fff;

}
</style>
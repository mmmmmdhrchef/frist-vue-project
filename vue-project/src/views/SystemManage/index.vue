<template>
    <div class="container">
        <!-- 模糊搜索 添加模块 start -->
        <div class="search">
            <span>项目状态：</span>
            <el-input size="large" style="width: 300px;" v-model="searchInfo" placeholder="请输入内容"
                @keyup.enter="searchHandle" />
            <el-button size="large" plain type="primary" @click="searchHandle">搜索</el-button>
            <el-button size="large" plain type="primary" @click="addHandle">添加</el-button>
            <!-- add对话框 start -->
            <el-dialog v-model="dialogAddVisible" title="添加项目信息" center width="700">
                <el-form :model="addFromInfo" ref="addFormRef" :rules="rules" >
                    <el-form-item label="用户名：" label-position="left" prop="username">
                        <el-input v-model="addFromInfo.username" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="密码：" label-position="right" prop="password">
                        <el-input type="password" v-model="addFromInfo.password" placeholder="请输入内容" show-password />
                    </el-form-item>
                    <el-form-item label="权限：" label-position="right">
                        <el-radio-group v-model="addFromInfo.permission" size="large" fill="#6cf">
                            <el-radio-button label="管理员" value="admin" />
                            <el-radio-button label="普通用户" value="vip" />
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="电话：" label-position="right" prop="phone">
                        <el-input v-model="addFromInfo.phone" placeholder="请输入内容" clearable />
                    </el-form-item>

                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogAddVisible = false">取消</el-button>
                        <el-button type="primary" @click="sureAddHandle">
                            确定
                        </el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- add对话框 end -->
        </div>
        <!-- 模糊搜索 添加模块 end -->

        <!-- 表格部分 start -->
        <div>
            <el-table :data="systemInfo.list" style="width: 100%" stripe :header-cell-style="headerCellStyle"
                :max-height="currentInnerHeight">
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="username" label="用户名" />
                <el-table-column label="权限">
                    <template #default="scope">
                        <el-tag :type="scope.row.permission === 'admin' ? 'danger' : 'primary'">{{ scope.row.permission
                            === 'admin' ? '管理员' : '普通用户' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="电话" />
                <el-table-column label="操作" width="500">
                    <template #default="scope">
                        <el-button type="info" :disabled="scope.row.id === 1 ? true : false"
                            @click="handleEdit(scope.$index, scope.row)">权限修改</el-button>
                        <el-button type="danger" :disabled="scope.row.id === 1 ? true : false"
                            @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- Edit对话框 start -->
            <el-dialog v-model="dialogEditVisible" title="用户信息" center width="700" label-position="left">
                <el-form :model="editFromInfo" ref="editFormRef" :rules="rules">
                    <el-form-item label="用户名：" prop="username">
                        <el-input :disabled="true"  v-model="editFromInfo.username" placeholder="请输入内容"  />
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input type="password" v-model="editFromInfo.password" placeholder="请输入内容" show-password />
                    </el-form-item>
                    <el-form-item label="权限：" label-position="right" >
                        <el-radio-group v-model="editFromInfo.permission" size="large" fill="#6cf">
                            <el-radio-button label="管理员" value="admin" />
                            <el-radio-button label="普通用户" value="vip" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="电话：" prop="phone">
                        <el-input v-model="editFromInfo.phone" placeholder="请输入内容" clearable />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogEditVisible = false">取消</el-button>
                        <el-button type="primary" @click="sureEditHandle">
                            确定
                        </el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- Edit对话框 end -->
        </div>
        <!-- 表格部分 end -->
    </div>
</template>
<script setup>
    import api from '@/api/index.js'
    import { onMounted, reactive, ref } from 'vue';
    import { ElMessage } from 'element-plus'

    /**
     * 初始化
     * */
    //表格信息初始化
    const systemInfo = reactive({
        list: []
    })
    //表格初始化
    onMounted(() => {
        http();
    })
    //搜索框数据初始化
    const searchInfo = ref('');
    //添加数据框显示初始化
    const dialogAddVisible = ref(false)
    //添加数据框数据初始化
    const addFromInfo = reactive({
        username: '',
        password: '',
        permission: 'vip',
        phone: '',
    })
    //编辑数据框 显示初始化
    const dialogEditVisible = ref(false)
    //编辑数据框 数据初始化
    const editFromInfo = reactive({
        id: -1,
        username: '',
        password: '',
        permission: 'vip',
        phone: '',
    })
    //获取窗口高度初始化
    const currentInnerHeight = ref(window.innerHeight - 130);
    onMounted(() => {
        window.addEventListener('resize', () => {
            currentInnerHeight.value = window.innerHeight - 130;
        });
    });
    //addFormRef
    const addFormRef = ref(null);
    //editFormRef
    const editFormRef = ref(null);
    /**
     * rules 表单规则
     */
    const rules = reactive({
        username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '长度3-10位', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    // 密码规则：6-20位，至少包含字母+数字+符号中的两种
                    const pwdReg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,20}$/;
                    if (!pwdReg.test(value)) {
                        callback(new Error('密码需包含字母、数字和符号'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            }
        ],
        phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    const phoneReg = /^1[3-9]\d{9}$/;
                    if (!phoneReg.test(value)) {
                        callback(new Error('请输入有效手机号'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            }
        ]
    })

    /**
     * 添加按钮 Handle
     * add对话框 重置设置
     */
    const addHandle = () => {
        addFromInfo.username = ''
        addFromInfo.password = ''
        addFromInfo.permission = 'vip'
        addFromInfo.phone = ''
        dialogAddVisible.value = true;
    };

    /**
     * 模糊搜索 Handle
     */
    const searchHandle = () => {
        const searchtext = ref('');
        searchtext.value = searchInfo.value
        //处理权限字段
        if (searchtext.value === '管理员') {
            searchtext.value = 'admin'
        }
        if (searchtext.value === '普通用户') {
            searchtext.value = 'vip';
        }

        api.getSystemSearch({ searchInfo: searchtext.value }).then(res => {
            if (res.data.status === 200) {
                systemInfo.list = res.data.result;
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    /**
     *  Table表头样式
     */
    const headerCellStyle = () => {
        return {
            backgroundColor: 'rgba(0,0,0,0.05)',
            fontWeight: '1000',
        }
    }

    /**
     * 表格数据请求
     */
    const http = () => {
        api.getSystemList().then(res => {
            if (res.data.status == 200) {
                systemInfo.list = res.data.result
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(error => {
            console.log(error);
            ElMessage.error('请求出错');
        })
    }

   
    /**
     * 表格编辑 删除 按钮Handle
     */
    const handleEdit = (index, row) => {
        dialogEditVisible.value = true;
        api.getSystemUpdataPre({ id: row.id }).then(res => {
            if (res.data.status === 200) {
                editFromInfo.id = res.data.result[0].id;
                editFromInfo.username = res.data.result[0].username
                editFromInfo.password = res.data.result[0].password
                editFromInfo.permission = res.data.result[0].permission
                editFromInfo.phone = res.data.result[0].phone
            }
        })
    }
    const handleDelete = (index, row) => {
        ElMessageBox.confirm(
            '确定删除吗?',
            '警告',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            api.getSystemDel({ id: row.id }).then(res => {
                if (res.data.status === 200) {
                    ElMessage({
                        type: 'success',
                        message: res.data.msg,
                    });
                    //刷新
                    http(1);
                } else {
                    ElMessage({
                        type: 'info',
                        message: res.data.msg,
                    })
                }
            })
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消',
            })
        })
    }
     /**
     * add对话框 确定 Hanele
     */
    const sureAddHandle = async () => {
        try{
            await addFormRef.value.validate();
            await api.getSystemAdd({ addFromInfo: addFromInfo }).then(res => {
                if (res.data.status === 200) {
                    dialogAddVisible.value = false;
                    ElMessage({
                        message: res.data.msg,
                        type: 'success',
                    })
                    //刷新页面
                    http(1)
                } else {
                    ElMessage({
                        message: res.data.msg,
                        type: 'warning',
                    })
                }
            })
        }catch(error){
            ElMessage.error('请填写完整表单');
            console.error('校验失败:', error);
        }
    }


    /**
     * 编辑对话框 确定按钮 Handle
     */
    const sureEditHandle = async () => {
        try{
            //检查数据
            await editFormRef.value.validate();
            await api.putSystemUpdata({ editFromInfo: editFromInfo }, editFromInfo.id).then(res => {
                if (res.data.status === 200) {
                    dialogEditVisible.value = false;
                    ElMessage({
                        message: res.data.msg,
                        type: 'success',
                    })
                    //刷新页面
                    http(1)
                } else {
                    ElMessage({
                        message: res.data.msg,
                        type: 'warning',
                    })
                }
            })
        }catch(error){
            ElMessage.error('请填写完整表单');
            console.error('校验失败:', error);
        }
        
    }
</script>

<style scoped>
/* 模糊搜索 添加模块样式 start */
.search {
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
}

.search span {
    font-weight: 1000;
}

/* .el-dialog__header{
    background-color: #304256;
} */
/* 用::v-deep穿透scoped */
:deep(.el-dialog__header.show-close ){
    padding-right: 0px !important;
}

/* 模糊搜索 添加模块样式 end */
</style>
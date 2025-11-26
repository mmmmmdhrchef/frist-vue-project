<template>
    <div class="container">
        <!-- 模糊搜索 添加模块 start -->
        <div class="search">
            <span>项目状态：</span>
            <el-input size="large" style="width: 300px;" v-model="searchInfo" placeholder="请输入内容"
                @keyup.enter="searchHandle" />
            <el-button size="large" plain type="primary" @click="searchHandle">搜索</el-button>
            <el-button size="large" plain type="primary" @click="dialogAddVisible = true">添加</el-button>
            <!-- add对话框 start -->
            <el-dialog v-model="dialogAddVisible" title="添加项目信息" center width="750" label-position="left">
                <el-form :inline="true" :model="addFromInfo" :rules="rules" ref="addFromRef">
                    <el-form-item label="项目名称：" prop="name">
                        <el-input v-model="addFromInfo.name" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目编号：" prop="number">
                        <el-input v-model="addFromInfo.number" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目金额：" prop="money">
                        <el-input v-model="addFromInfo.money" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目地址：" prop="address">
                        <el-input v-model="addFromInfo.address" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目工期：" prop="duration">
                        <el-input v-model="addFromInfo.duration" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="开工时间：" prop="startTime"> 
                        <el-date-picker v-model="addFromInfo.startTime" value-format="x" type="date" />
                    </el-form-item>
                    <el-form-item label="终止时间：" prop="endTime">
                        <el-date-picker v-model="addFromInfo.endTime" value-format="x" type="date" />
                    </el-form-item>
                    <el-form-item label="隧道数量：" prop="quantity">
                        <el-input v-model="addFromInfo.quantity" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目状态：" prop="status">
                        <el-radio-group v-model="addFromInfo.status"  style="width: 220px;">
                            <el-radio-button label="施工中" value="1" />
                            <el-radio-button label="已完成" value="0" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <tinymceEditor @onDataEvent="getAddFrom"></tinymceEditor>
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

        <!-- 表格模块 start -->
        <div>
            <!-- 项目表格部分 start -->
            <el-table :data="project.list" show-overflow-tooltip stripe style="width: 100%"
                :header-cell-style="headerCellStyle" :max-height="currentInnerHeight">
                <el-table-column prop="name" label="项目名称" width="150" />
                <el-table-column prop="number" label="项目编号" width="100" />
                <el-table-column prop="money" label="项目金额" width="120" />
                <el-table-column prop="address" label="项目地址" width="150" />
                <el-table-column prop="duration" label="项目工期(月)" width="120" />
                <el-table-column prop="startTime" label="开工时间" width="150">
                    <template #default="scope">
                        <p>{{ dateFormat(Number(scope.row.startTime)) }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="endTime" label="终止时间" width="150">
                    <template #default="scope">
                        <p>{{ dateFormat(Number(scope.row.endTime)) }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="quantity" label="隧道数量" width="100" />
                <el-table-column prop="status" label="项目状态" width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.status == 1 ? 'primary' : 'success'">{{
                            statusHandle(scope.row.status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                    <template #default="scope">
                        <p v-html="scope.row.remark"></p>
                    </template>
                </el-table-column>
                <el-table-column label="选项" width="150">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 项目表格部分 end -->
            <!-- Edit对话框 start -->
            <el-dialog v-model="dialogEditVisible" title="项目信息" center width="750" label-position="left">
                <el-form :inline="true" :model="editFromInfo" :rules="rules" ref="editFromRef">
                    <el-form-item label="项目名称：" prop="name">
                        <el-input v-model="editFromInfo.name" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目编号：" prop="number">
                        <el-input v-model="editFromInfo.number" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目金额：" prop="money">
                        <el-input v-model="editFromInfo.money" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目地址：" prop="address">
                        <el-input v-model="editFromInfo.address" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目工期：" prop="duration">
                        <el-input v-model="editFromInfo.duration" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="开工时间：" prop="startTime">
                        <el-date-picker v-model="editFromInfo.startTime" value-format="x" type="date" />
                    </el-form-item>
                    <el-form-item label="终止时间：" prop="endTime">
                        <el-date-picker v-model="editFromInfo.endTime" value-format="x" type="date" />
                    </el-form-item>
                    <el-form-item label="隧道数量：" prop="quantity">
                        <el-input v-model="editFromInfo.quantity" style="width: 220px;" placeholder="请输入内容" clearable />
                    </el-form-item>
                    <el-form-item label="项目状态：" prop="status">
                        <el-radio-group v-model="editFromInfo.status"  style="width: 220px;">
                            <el-radio-button label="施工中" value="1" />
                            <el-radio-button label="已完成" value="0" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <tinymceEditor :value="editFromInfo.remark" @onDataEvent="getAddFrom"></tinymceEditor>
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
        <!-- 表格模块 end -->

        <!-- 分页部分 start -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next, jumper" :total="total"
                @current-change="changePageHandle" :default-page-size=12 />
        </div>
        <!-- 分页部分 end -->
    </div>
</template>
<script setup>
    import api from '@/api/index.js'

    import tinymceEditor from '@/components/TinymceEditor/index.vue';

    import { dateFormat } from '@/utils/dateFormat.js'
    import { onMounted, reactive, ref } from 'vue';
    import { ElMessage } from 'element-plus'
    /**
     * 初始化
     * */
    //表格数据初始化
    const project = reactive({
        list: []
    })
    //表格初始化渲染
    onMounted(() => {
        http(1);
    })
    //分页总条数初始化
    onMounted(() => {
        api.getTotal().then(res => {
            total.value = res.data.result[0]["count(*)"]
        })
    })
    //分页总条数初始化
    const total = ref(0);
    //搜索框信息初始化
    const searchInfo = ref("");
    //add对话框显示初始化
    const dialogAddVisible = ref(false)
    //add对话框input初始化
    const addFromInfo = reactive({
        name: '',
        number: '',
        money: '',
        address: '',
        duration: '',
        startTime: '',
        endTime: '',
        quantity: '',
        status: '',
        remark: '',
    })
    //edit对话框显示初始化
    const dialogEditVisible = ref(false)
    //edit对话框input初始化
    const editFromInfo = reactive({
        id: -1,
        name: '',
        number: '',
        money: '',
        address: '',
        duration: '',
        startTime: '',
        endTime: '',
        quantity: '',
        status: '',
        remark: '',
    })
    //获取窗口高度初始化
    const currentInnerHeight = ref(window.innerHeight - 130);
    onMounted(() => {
        window.addEventListener('resize', () => {
            currentInnerHeight.value = window.innerHeight - 130;
        });
    });

    /**
     * 请求项目数据函数
     */
    const http = (page) => {
        api.getProject({ page: page }).then(res => {
            if (res.data.status === 200)
                project.list = res.data.result;
        }).catch(error => {
            console.log("项目信息数据请求失败");
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
     * 施工状态文字切换
     */
    const statusHandle = (status) => {
        return status == 1 ? '施工中' : '已完成';
    }

    /**
     * 表格编辑 删除 按钮Handle
     */
    const handleEdit = (index, row) => {
        dialogEditVisible.value = true;
        api.getUpdatePreProject({ id: row.id }).then(res => {

            if (res.data.status === 200) {
                editFromInfo.id = res.data.result[0].id;
                editFromInfo.name = res.data.result[0].name
                editFromInfo.number = res.data.result[0].number
                editFromInfo.money = res.data.result[0].money
                editFromInfo.address = res.data.result[0].address
                editFromInfo.duration = res.data.result[0].duration
                editFromInfo.startTime = Number(res.data.result[0].startTime)
                editFromInfo.endTime = Number(res.data.result[0].endTime)
                editFromInfo.quantity = res.data.result[0].quantity
                editFromInfo.status = res.data.result[0].status
                editFromInfo.remark = res.data.result[0].remark
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
            api.getDelProject({ id: row.id }).then(res => {
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
        })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消',
                })
            })


    }

    /**
     * 搜索添加模块 按钮Handle
     */
    const searchHandle = () => {
        api.getSearch({ searchInfo: searchInfo.value }).then(res => {
            if (searchInfo.value == '') {
                http(1)
            } else {
                if (res.data.status === 200) {
                    project.list = res.data.result;
                    console.log(res);
                } else {
                    ElMessage(res.data.msg);
                }
            }
        })
    }

    /**
     * 分页按钮触发
     */
    const changePageHandle = (page) => {
        http(page)
    }

    const rules = reactive({
        name: [
           { required: true, message: '项目名称不能为空', trigger: 'blur' },
        ],
        number: [
            { required: true, message: '项目编号不能为空', trigger: 'blur' }
        ],
        money: [
            { required: true, message: '项目金额不能为空', trigger: 'blur' }
        ],
        address: [
            { required: true, message: '项目地址不能为空', trigger: 'blur' }
        ],
        duration: [
            { required: true, message: '项目周期不能为空', trigger: 'blur' }
        ],
        startTime: [
            { required: true, message: '项目开工时间不能为空', trigger: 'blur' }
        ],
        endTime: [
            { required: true, message: '项目结束时间不能为空', trigger: 'blur' }
        ],
        quantity: [
            { required: true, message: '隧道数量不能为空', trigger: 'blur' }
        ],
        status: [
            { required: true, message: '项目状态不能为空', trigger: 'blur' }
        ],
    })


    /**
     * add对话框确定按钮
     */
    const addFromRef = ref(null)
    const sureAddHandle = async () => {
        try {
            await addFromRef.value.validate()
            await api.getAddProject({ addFromInfo: addFromInfo }).then(res => {
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
        } catch (error) {
            ElMessage.error('请填写完整表单');
            console.error('校验失败:', error);
        }
    }

    /**
     * add对话框备注Editor数据获取Handle
     */
    const getAddFrom = (data) => {
        addFromInfo.remark = data
    }

    /**
     * edit对话框确定按钮
     */
    const editFromRef = ref(null);
    const sureEditHandle = async () => {
        await editFromRef.value.validate();

        await api.putUpdataProject({ editFromInfo: editFromInfo }, editFromInfo.id).then(res => {
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
    }
</script>
<style scoped>
/* 分页模块样式 start */
.pagination {
    position: absolute;
    right: 0px;
    bottom: 50px;
}

/* 分页模块样式 end */
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
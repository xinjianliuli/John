<template>
  <div>
    <el-button type="primary" size="default" @click="bindAdd">添加</el-button>
    <el-table :data="goodsList">
      <el-table-column label="序号" prop="id" width="80px"></el-table-column>
      <el-table-column label="图片">
        <template #default="{row}">
          <el-image :src="filterUrl(row.picture)" style="width:120px ;height:120px"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="店铺" prop="shop"></el-table-column>
      <el-table-column label="商家" prop="product"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="原价" prop="oldprice"></el-table-column>
      <el-table-column label="分类" prop="categoryname"></el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button type="primary" size="small" @click="">编辑</el-button>
         <el-popconfirm
         title="确定要删除吗？"
         confirmButtonText="确定"
         cancelButtonText="取消"
         iconColor="#f90"
         @confirm="bindDetal(row.id)"
         >
         <template #reference>
          <el-button type="success" size="small">删除</el-button>
        </template>
         </el-popconfirm>
         
        </template>
      </el-table-column>
    </el-table>
        <el-pagination
        v-model:page-size="pageSize"
        :page-sizes="[5,10,20,30]"
         backgorund
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        >
        
        </el-pagination>
    
      <el-dialog  title="添加商品" v-model="display" width="45%">
        <el-form :model="goodsForm" ref="goodsref" :rules="rules" label-width="80px" >
          <el-form-item label="店铺名称" >
            <el-input v-model="goodsForm.shop"></el-input>
          </el-form-item>
          <el-form-item label="商品名称"  prop="product">
          <el-input v-model="goodsForm.product"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="goodsForm.categoryId" placeholder="选择分类">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
           </el-select>
          </el-form-item>
          <el-form-item label="现价">
          <el-input v-model="goodsForm.price"></el-input>
          </el-form-item>
          <el-form-item label="原价">
          <el-input v-model="goodsForm.oldprice"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload action="#" list-type="picture-card" :auto-upload="true" :show-file-list="false" :before-upload="beforeAvaterupload">
              <img v-if="imageURL" :src="imageURL" alt='imageURL' class="avater" />
                  <el-icon v-else><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="上下架">
            <el-radio-group v-model="goodsForm.putaway">
            <el-radio :label="0">上架</el-radio>
            <el-radio :label="1">下架</el-radio>
          </el-radio-group>
          </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>
    
  </div>
</template>

<script setup>
import {ref,onMounted,reactive}from 'vue'
import {RequestGoodsList,RequestGoodsADD,RequestGoodsCategory,RequestGoodsDetal}from '../../api/path/index'
import {ElMessage}from 'element-plus'
import {filterUrl}from '../../utils/index'
import {Plus}from '@element-plus/icons-vue'
const goodsList=ref([])
const display=ref(false)
const imageURL=ref('')
const imageFile=ref(null)
const total=ref(0)
const pageSize =ref(5)
const pageNo =ref(1)
const rules=ref({
  product: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
})
// 定义对象 接收表单的属性 用于绑定 
let goodsForm =reactive({
      shop:'',
      product:'',
      categoryId:'',
      price:'',
      oldprice:'',
      putaway:0,
})
const categoryList =ref([])
// 商品列表数据
const getGoodsList=async()=>{
  const data =await RequestGoodsList(pageNo.value,pageSize.value)
  const {resultCode,resultInfo}=data 
  if(resultCode===1){
    total.value=resultInfo.total
    goodsList.value=resultInfo.list
  }
}
// 商品分类数据
const getGoodsCategory=async()=>{
  const data=await RequestGoodsCategory()
  const {resultCode,resultInfo}=data 
  if(resultCode===1){
    categoryList.value=resultInfo.list
  }
}
// 上传图片限制条件 
function beforeAvaterupload(rowFile){
  const Whie =['image/jpeg','image/png','image/jpg']
  if(!Whie.includes(rowFile.type)){
    ElMessage.error('上传图片格式不正确',)
    return false
  }
  const M5 =1024 * 1024 * 5 
  if(rowFile.size >M5){
    ElMessage.error(
     '上传图片不能大于5M',
     
    )
    return false 
  }
      imageURL.value=URL.createObjectURL(rowFile)
     imageFile.value=rowFile
     return false 
}
// 添加
const bindAdd=()=>{
  display.value=true
  getGoodsCategory() //点击时 获取商品分类数据  
}
// 添加商品---表单 
const  onSubmit=async()=>{
  const formData =new FormData()
  formData.append('categoryId',goodsForm.categoryId)
  formData.append('product',goodsForm.product)
  formData.append('picture',imageFile.value)
  formData.append('shop',goodsForm.shop)
  formData.append('price',goodsForm.price)
  formData.append('oldprice',goodsForm.oldprice)
  formData.append('putaway',goodsForm.putaway)
  const data=await RequestGoodsADD(formData)
  const {resultCode}=data 
  if(resultCode===1){
    ElMessage.success('上传成功')
    display.value=false
    getGoodsList()
    
  }
}
// 页数 
const handleSizeChange = value =>{
  pageSize.value=value 
  getGoodsList()
}
const handleCurrentChange = value =>{
  pageNo.value=value
  getGoodsList() 
  
} 
// 删除商品
const bindDetal=async id =>{
  const data =await RequestGoodsDetal(id)
  const {resultCode}=data 
  if(resultCode===1){
    ElMessage.success('删除成功')
    getGoodsList()
  }
}
onMounted(()=>{
  getGoodsList()
 
})
</script>

<style lang='scss' scoped>
.avater{
  width: 150px;
  height: 150px;
  display: block;
}
</style>

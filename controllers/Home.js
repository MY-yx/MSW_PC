const PAGE_CONF = require('../configs/page'), // 页面配置信息 => header title/css
      navData = require('../configs/nav'),
      linkData = require('../configs/link'),
      manualData = require('../configs/manual'),
      { infomation } = require('../configs/qr'),
      { IMG_BASE_URL } = require('../configs/url'),
      { searchData } = require('../libs/utils');

// API -> 获取data并注入到ejs模板里
const { getSliderData } = require('../services/Slider'),
      { getRecomCourseData } = require('../services/RecomCourse'),
      { getCollectionData } = require('../services/Collection'),
      { getStarTeacherData } = require('../services/Teacher'),
      { getGoodStudentData } = require('../services/Student'),
      { getCourseCategory } = require('../services/CourseTab'),
      { getCourseData } = require('../services/Course');

class Home {
  // 首页
  async index (ctx, next) {
    
    const sliderData = await getSliderData(),
          recomCourseData = await getRecomCourseData(),
          collectionData = await Promise.all((await getCollectionData()).map(async (item) => item)), // 这里是需要使用Promise.all的, 不然拿到结果前async返回的都是一个promise对象
          starTeacherData = await getStarTeacherData(),
          goodStudentData = await getGoodStudentData();

    await ctx.render('index', {
      PAGE_CONF: PAGE_CONF.INDEX,
      IMG_BASE_URL,
      qrInfomation: infomation,
      navData,
      sliderData,
      recomCourseData,
      collectionData,
      starTeacherData,
      goodStudentData,
      linkData,
      manualData
    });
  }

  // 列表页
  async list (ctx, next) {
    
    const keyword = ctx.params.kw,
          courseTabData = await getCourseCategory(),
          courseData = await getCourseData();

    await ctx.render('list', {
      PAGE_CONF: PAGE_CONF.LIST,
      IMG_BASE_URL,
      qrInfomation: infomation,
      navData,
      linkData,
      manualData,
      courseTabData,
      courseData: keyword ? searchData(courseData, keyword) : courseData,
      courseDataStr: JSON.stringify(courseData)
    });
  }

  // 异常
  async error (ctx, next) {
  	await ctx.render('error', {
      PAGE_CONF: PAGE_CONF.ERROR,
      qrInfomation: infomation,
      navData,
      linkData,
      manualData
  	});
  }
}

module.exports = new Home();
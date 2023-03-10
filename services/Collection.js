const CollectionModel = require('../db/models/collection'),
      { getCollectionCourseData } = require('./Course');

class CollectionService {
  async getCollectionData () {
  	const result = await CollectionModel.findAll({
  		raw: true, // 源数据 => JSON数据
  		wiere: { status: 1 },
	  	attributes: {
	  		exclude: ['cid', 'createdAt', 'updatedAt']
	  	}
  	});

  	return result.map(async (item, index) => {
      item.courseIdList = item.courseIdList.split(',').map(item => parseInt(item));
			// 拼接课程信息
  	  item.courseDataList = await getCollectionCourseData(item.courseIdList);
  	  return item; // item: Promise => Promise.all
  	});
  }
}

module.exports = new CollectionService();
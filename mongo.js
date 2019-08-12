
**************
**  全文索引  **
**************


@创建一个新的集合
[console]> db.news.insert([
	{"title":"A","content":"Application"},
	{"title":"B C","content":"Broswer Client"},
	{"title":"D","content":"Driver"},
	{"title":"D","content":"Description"}
]);
	console==>
	BulkWriteResult({
		"writeErrors" : [ ],
		"writeConcernErrors" : [ ],
		"nInserted" : 4,
		"nUpserted" : 0,
		"nMatched" : 0,
		"nModified" : 0,
		"nRemoved" : 0,
		"upserted" : [ ]
	})

	

@设置全局索引
[console]> db.news.ensureIndex({"title":"text","content":"text"});
	console==>
	{
		"createdCollectionAutomatically" : false,
		"numIndexesBefore" : 1,
		"numIndexesAfter" : 2,
		"ok" : 1
	}


#如果需要使用全文索引,则必须加上$text判断符,而想要进行数据的查询
	==>	查询指定关键字:
				{"$search":"查询关键字"};

	==>	查询多个关键字(or):
				{"$search":"关键字1 关键字2"}

	==>  查询多个关键字(and):
				{"$search":"\"关键字1\" \"关键字2\""}

	==>  查询多个关键字(排除一个):
				{"$search":"关键字1 关键字2 -排序关键字"}


@因为是全文检索,所以不能查询部分关键字段.查询包含为"B"的数据
[console]>db.news.find(); //查看全部数据
	console==>
	{ "_id" : ObjectId("5d5125d15f98a59c6fb7de30"), "title" : "A", "content" : "Application" }
	{ "_id" : ObjectId("5d5125d15f98a59c6fb7de31"), "title" : "B C", "content" : "Broswer Client" }
	{ "_id" : ObjectId("5d5125d15f98a59c6fb7de32"), "title" : "D", "content" : "Driver" }
	{ "_id" : ObjectId("5d5125d15f98a59c6fb7de33"), "title" : "D", "content" : "Description" }


[console]> db.news.find({
	"$text":{
		"$search":"B"
	}
});
	
	console==>
	{ "_id" : ObjectId("5d5125d15f98a59c6fb7de31"), "title" : "B C", "content" : "Broswer Client" }



@全文检索,包含"B"和"C"的数据
[console]> db.news.find({
	"$text":{
		"$search":"B C"
	}
});

	console==>
	{ "_id" : ObjectId("5d5125d15f98a59c6fb7de31"), "title" : "B C", "content" : "Broswer Client" }


#进行全文检索还可以进行打分
@为 "C" 的出现进行打分
[console]> db.news.find(
	{
		"$text":{
			"$search":"C"
		}
	},
	{
		"score":{
			"$meta":"textScore"
		}
	}
);

	console==>   //这个0.75,类似于Mybatis+Ehcache中的命中率.
	{ "_id" : ObjectId("5d5125d15f98a59c6fb7de31"), "title" : "B C", "content" : "Broswer Client", "score" : 0.75 }



@为全部字段设置为全文检索
[console]> db.news.dropIndexes();  //先删除全部索引
	console==>
	{
		"nIndexesWas" : 2,
		"msg" : "non-_id indexes dropped for collection",
		"ok" : 1
	}


[console]> db.news.ensureIndex({"$**":"text"});
	console==>
	{
		"createdCollectionAutomatically" : false,
		"numIndexesBefore" : 1,
		"numIndexesAfter" : 2,
		"ok" : 1
	}




*******************
*** 地理信息索引 ***
*******************

//2D平面索引和球面索引,通常用于保存坐标
@创建一个坐标表
[console]> db.shops.insert([
	{"loc":[10,20]},
	{"loc":[20,30]},
	{"loc":[20,10]},
	{"loc":[30,20]},
	{"loc":[40,30]},
	{"loc":[30,40]},
	{"loc":[10,40]},
	{"loc":[40,10]}
]);
	
	console==>
	BulkWriteResult({
		"writeErrors" : [ ],
		"writeConcernErrors" : [ ],
		"nInserted" : 8,
		"nUpserted" : 0,
		"nMatched" : 0,
		"nModified" : 0,
		"nRemoved" : 0,
		"upserted" : [ ]
	})


@为商品表定义2D索引
[console]> db.shops.ensureIndex({"loc":"2d"});
	console==>
	{
		"createdCollectionAutomatically" : true,
		"numIndexesBefore" : 1,
		"numIndexesAfter" : 2,
		"ok" : 1
	}


#这个索引常用的方法
	==> 查询最近的坐标点:
			{"$naer":[x,y]}

	==> 查询某个形状的点:
			{"geoWithin":[x,y]}

@假设现在我在[30,15]的位置,我现在要获取最近的商店
[console]> db.shops.find({
	loc:{
		"$near":[30,15]
	}
});

	console==>
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0a"), "loc" : [ 30, 20 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd09"), "loc" : [ 20, 10 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0e"), "loc" : [ 40, 10 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd08"), "loc" : [ 20, 30 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0b"), "loc" : [ 40, 30 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd07"), "loc" : [ 10, 20 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0c"), "loc" : [ 30, 40 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0d"), "loc" : [ 10, 40 ] }
	//但是这里会返回全部,现在我只需要返回最近的3个地方的信息就好了

@使用"$maxDistance"来限制返回的数据量,这里我只返回5个距离以内的信息	//他不支持最小的数据量
[console]>db.shops.find({
	loc:{
		"$near":[30,15],
		"$maxDistance":5
	}
});

	console==>
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0a"), "loc" : [ 30, 20 ] }




*******************
***         聚合       ***
*******************

@获取shops表中的数据量
[console]> db.shops.count();
	console==>
	8

[console]> db.shops.find();   //查看原来的数据
	console==>
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd07"), "loc" : [ 10, 20 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd08"), "loc" : [ 20, 30 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd09"), "loc" : [ 20, 10 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0a"), "loc" : [ 30, 20 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0b"), "loc" : [ 40, 30 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0c"), "loc" : [ 30, 40 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0d"), "loc" : [ 10, 40 ] }
	{ "_id" : ObjectId("5d512d4dd26314fe9391dd0e"), "loc" : [ 40, 10 ] }


//注意,所有的无条件查询会比条件查询快很多
@数组统计
[console]> db.shops.count(
	{
		"loc":{
			"$size":2
		}
	}
);
	console==>
	8



@数据去重 ("distinct")
//先插入一波数据,并且删除所有表先
[console]> db.student.drop();
	console==>
	true

[console]> db.news.drop();
	console==>
	true


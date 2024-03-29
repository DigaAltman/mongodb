/**
	*	MongoDB数据库是一种NOSQL数据库,由于SQL的操作过于麻烦.而且功能都太简单了.并且读取和存储的速度是有限的.所以NoSQL就出来了。
	*
	*	NoSQL的出现是为了弥补SQL的不足。而不是取代SQL,比如我们使用NoSQL来存储SQL中查询出来的结果的json信息.节省SQL数据库的查询消耗
	*/


/**
	*@db
	*Mongodb中的集合对应SQL中的表
	*Mongodb中的文档对应SQL中的列数据
	*
    */

 /**
 	*****************
 	**mongodb的启动**
	*****************
	*/
@简单启动
> mongod

@指定数据目录启动
> mongod --dpath 数据存放目录

@指定端口号启动
> mongod --port=端口号

@指定配置文件位置启动
> mongo  -f 配置文件路径

@查看数据库
> show dbs;

@切换数据库(注意,如果这个数据库不存在,则创建后切换)
> use dbName;

@删除数据库
>db.dropDatabase();

@关闭服务
> db.shutdownServer

@查看所有集合
> show collections;

@创建集合
> db.createCollection(collectionName)

@查看集合,和show collections的效果一样的
> show tables;

@删除集合
>db.collectionName.drop()


/**
 	*******************
 	**mongodb数据插入**
	*******************
	*/

//插入一条数据
var student={
	"name":"邓艾",
	"class":"蜀",
	"blood":4,
	"skill":"屯田"
}
db.sgs.insert(student);


//插入多条数据
var students=[
	{"name":"陆逊","class":"吴","blood":3,"skill":"联营,谦逊"},
	{"name":"袁绍","class":"群","blood":4,"skill":"乱箭"}
]

//js的for循环插入
let json=[
	{"name":"周瑜","class":"吴","blood":3,"skill":"英姿,房间"},
	{"name":"袁术","class":"群","blood":4,"skill":"妄尊"}，
	{"name":"貂蝉","class":"群","blood":3,"skill":"闭月,离间"}，
	{"name":"孙策","class":"吴","blood":4,"skill":"妄尊"}
]

for(var i=0;i<json.length;i++){
	db.sgs.insert(json[i]);
}

db.hero.insert([
	{"name":"周瑜","class":"吴","blood":3,"skill":"英姿,房间"},
	{"name":"袁术","class":"群","blood":4,"skill":"妄尊"},
	{"name":"貂蝉","class":"群","blood":3,"skill":"闭月,离间"},
	{"name":"孙策","class":"吴","blood":4,"skill":"妄尊"},
	{"name":"陆逊","class":"吴","blood":3,"skill":"联营,谦逊"},
	{"name":"袁绍","class":"群","blood":4,"skill":"乱箭"}
]);


/**
 	*******************
 	**mongodb数据查询**
	*******************
	*/

#现在查询hero中的blood为的英雄
[console]> db.hero.find({"blood":4});


#mongodb中还有投影功能,通过0和1来表示显示和不现实.只需要设置
为0标识不显示
[console]> db.hero.find({"name":"周瑜"},{"_id":0});


#findOne,只获取一个结果
[console]> db.hero.findOne({"name":"孙策"});
	{
        "_id" : ObjectId("5d42e41b0880128cece0f09b"),
        "name" : "孙策",
        "class" : "吴",
        "blood" : 4,
        "skill" : "妄尊"
	}


#drop删除集合
[console]> db.hero.drop();



#查询blood为3的英雄信息
[console]>	db.hero.find({"blood":3})

	{ "_id" : ObjectId("5d42e41b0880128cece0f098"), "name" : "周瑜", "class" : "吴", "blood" :3, "skill" : "英姿,房间" }
	{ "_id" : ObjectId("5d42e41b0880128cece0f09a"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : "闭月,离间" }
	{ "_id" : ObjectId("5d42e41b0880128cece0f09c"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : "联营,谦逊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f09e"), "name" : "周瑜", "class" : "吴", "blood" :3, "skill" : "英姿,房间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a0"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : "闭月,离间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a2"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : "联营,谦逊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a4"), "name" : "周瑜", "class" : "吴", "blood" :3, "skill" : "英姿,房间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a6"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : "闭月,离间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a8"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : "联营,谦逊" }


@查询姓名不是周瑜的信息
[console]> db.hero.find({"name":{
	"$ne":"周瑜"
}});

	{ "_id" : ObjectId("5d42e3cf0880128cece0f097"), "name" : "邓艾", "class" : "蜀", "blood" :4, "skill" : "屯田" }
	{ "_id" : ObjectId("5d42e41b0880128cece0f099"), "name" : "袁术", "class" : "群", "blood" :4, "skill" : "妄尊" }
	{ "_id" : ObjectId("5d42e41b0880128cece0f09a"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : "闭月,离间" }
	{ "_id" : ObjectId("5d42e41b0880128cece0f09b"), "name" : "孙策", "class" : "吴", "blood" :4, "skill" : "妄尊" }
	{ "_id" : ObjectId("5d42e41b0880128cece0f09c"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : "联营,谦逊" }
	{ "_id" : ObjectId("5d42e41b0880128cece0f09d"), "name" : "袁绍", "class" : "群", "blood" :4, "skill" : "乱箭" }
	{ "_id" : ObjectId("5d42e4250880128cece0f09f"), "name" : "袁术", "class" : "群", "blood" :4, "skill" : "妄尊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a0"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : "闭月,离间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a1"), "name" : "孙策", "class" : "吴", "blood" :4, "skill" : "妄尊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a2"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : "联营,谦逊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a3"), "name" : "袁绍", "class" : "群", "blood" :4, "skill" : "乱箭" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a5"), "name" : "袁术", "class" : "群", "blood" :4, "skill" : "妄尊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a6"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : "闭月,离间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a7"), "name" : "孙策", "class" : "吴", "blood" :4, "skill" : "妄尊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a8"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : "联营,谦逊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a9"), "name" : "袁绍", "class" : "群", "blood" :4, "skill" : "乱箭" }


关系运算(大于{$gt},小于{$lt},大于等于{$gte},小于等于{$lte},等于:{传值})

@查询blood小于4的英雄信息
[console]>  db.hero.find({
	"blood":{"$lt",4}
})
	
	{ "_id" : ObjectId("5d42e41b0880128cece0f098"), "name" : "周瑜", "class" : "吴", "blood" :3, "skill" : "英姿,房间" }
	{ "_id" : ObjectId("5d42e41b0880128cece0f09a"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : "闭月,离间" }
	{ "_id" : ObjectId("5d42e41b0880128cece0f09c"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : "联营,谦逊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f09e"), "name" : "周瑜", "class" : "吴", "blood" :3, "skill" : "英姿,房间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a0"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : "闭月,离间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a2"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : "联营,谦逊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a4"), "name" : "周瑜", "class" : "吴", "blood" :3, "skill" : "英姿,房间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a6"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : "闭月,离间" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a8"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : "联营,谦逊" }


逻辑运算	 与($and),或($or),非($not,$nor)

@查询class为吴的并且blood是4的英雄信息
[console]> db.hero.find({
	"$and":[
		{"blood":
			{"$gt":3}
		},
		{"class":"吴"}
	]
})

	{ "_id" : ObjectId("5d42e41b0880128cece0f09b"), "name" : "孙策", "class" : "吴", "blood" :4, "skill" : "妄尊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a1"), "name" : "孙策", "class" : "吴", "blood" :4, "skill" : "妄尊" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a7"), "name" : "孙策", "class" : "吴", "blood" :4, "skill" : "妄尊" }


@查询blood在3~8之间的英雄信息
[console]> db.hero.find({
	'blood':{
		"$lt":8,
		"$gt":3
	}
})


	{ "_id" : ObjectId("5d42e3cf0880128cece0f097"), "name" : "邓艾", "class" : "蜀", "blood" :4, "skill" : "屯田" }
	{ "_id" : ObjectId("5d42e4250880128cece0f0a9"), "name" : "袁绍", "class" : "群", "blood" :4, "skill" : "乱箭" }



@这里重新插一遍
[console]> db.hero.insert([
		{ "name" : "邓艾", "class" : "蜀", "blood" :4, "skill" : ["屯田"],"sex":"男" },
		{ "name" : "袁术", "class" : "群", "blood" :4, "skill" : ["妄尊"] ,"sex":"男"},
		{ "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : ["闭月","离间"],"sex":"女" },
		{ "name" : "孙策", "class" : "吴", "blood" :4, "skill" : ["妄尊"],"sex":"男" },
		{ "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : ["联营","谦逊"] ,"sex":"男"},
		{ "name" : "袁绍", "class" : "群", "blood" :4, "skill" : ["乱箭"] ,"sex":"男"},
		{ "name" : "曹操", "class" : "魏", "blood" :4, "skill" : ["枭雄"],"sex":"男" },
		{ "name" : "郭嘉", "class" : "魏", "blood" :3, "skill" : ["天妒","遗计"] ,"sex":"男"},
		{ "name" : "神吕布", "class" : "神", "blood" :5, "skill" : ["无双","修罗","无谋","骁勇"],"sex":"男" },
		{ "name" : "神诸葛亮", "class" : "神", "blood" :3, "skill" : ["七星","狂风","大雾"],"sex":"男" },
		{ "name" : "神陆逊", "class" : "神", "blood" :4, "skill" : ["攻心","联营"] ,"sex":"男"},
		{ "name" : "tomcatBbzzzs", "class" : "神", "blood" :9999, "skill" : ["万象","神迹","天惩","严刑","大雾","神火","天雷","烈酒","桃园","灭技"] ,"sex":"男"}
	])
	

@现在查看技能数量大于4或量>=5的英雄信息
[console]> db.hero.find({
	"$or":[
		{"blood":{
			"$gte":5
		}},
		{"skill":{
			"$size":4
		}}
	]
}).pretty()

		{
		        "_id" : ObjectId("5d42f61f0880128cece0f0b2"),
		        "name" : "神吕布",
		        "class" : "神",
		        "blood" : 5,
		        "skill" : [
		                "无双",
		                "修罗",
		                "无谋",
		                "骁勇"
		        ],
		        "sex" : "男"
		}
		{
		        "_id" : ObjectId("5d42f61f0880128cece0f0b5"),
		        "name" : "tomcatBbzzzs",
		        "class" : "神",
		        "blood" : 9999,
		        "skill" : [
		                "万象",
		                "神迹",
		                "天惩",
		                "严刑",
		                "大雾",
		                "神火",
		                "天雷",
		                "烈酒",
		                "桃园",
		                "灭技"
		        ],
		        "sex" : "男"
		}		



求模

@比如我计算一个结果/3的余数是1的blood的英雄
[console]>  db.hero.find({"blood":{
	"$mod":[3,1]
}})

	{ "_id" : ObjectId("5d42f61f0880128cece0f0aa"), "name" : "邓艾", "class" : "蜀", "blood" : 4, "skill" : [ "屯田" ],"sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0ab"), "name" : "袁术", "class" : "群", "blood" : 4, "skill" : [ "妄尊" ],"sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0ad"), "name" : "孙策", "class" : "吴", "blood" : 4, "skill" : [ "妄尊" ],"sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0af"), "name" : "袁绍", "class" : "群", "blood" : 4, "skill" : [ "乱箭" ],"sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b0"), "name" : "曹操", "class" : "魏", "blood" : 4, "skill" : [ "枭雄" ],"sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b4"), "name" : "神陆逊", "class" : "神", "blood" : 4, "skill" : [ "攻心","联营" ], "sex" : "男" }


@现在查询一个结果/3的余数是0的blood的英雄
[console]> db.hero.find({
	"blood":{
		"$mod":[3,0]
	}
})

	{ "_id" : ObjectId("5d42f61f0880128cece0f0ac"), "name" : "貂蝉", "class" : "群", "blood" : 3, "skill" : [ "闭月", "离间" ], "sex" : "女" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0ae"), "name" : "陆逊", "class" : "吴", "blood" : 3, "skill" : [ "联营", "谦逊" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b1"), "name" : "郭嘉", "class" : "魏", "blood" : 3, "skill" : [ "天妒", "遗计" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b3"), "name" : "神诸葛亮", "class" : "神", "blood" : 3, "skill" : [ "七星", "狂风", "大雾" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b5"), "name" : "tomcatBbzzzs", "class" : "神", "blood" : 9999, "skill" : ["万象", "神迹", "天惩", "严刑", "大雾", "神火", "天雷", "烈酒", "桃园", "灭技" ], "sex" : "男" }



只要是数据库,就存在in和not in ,mongo中的in和not in对应($in),($nin)

@查询所属势力属于神和群的英雄
[console]> db.hero.find({
	"class":{
		"$in":["神","群"]
	}
})
	

	{ "_id" : ObjectId("5d42f61f0880128cece0f0ab"), "name" : "袁术", "class" : "群", "blood" : 4, "skill" : [ "妄尊" ],"sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0ac"), "name" : "貂蝉", "class" : "群", "blood" : 3, "skill" : [ "闭月", "离间" ], "sex" : "女" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0af"), "name" : "袁绍", "class" : "群", "blood" : 4, "skill" : [ "乱箭" ],"sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b2"), "name" : "神吕布", "class" : "神", "blood" : 5, "skill" : [ "无双","修罗", "无谋", "骁勇" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b3"), "name" : "神诸葛亮", "class" : "神", "blood" : 3, "skill" : [ "七星", "狂风", "大雾" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b4"), "name" : "神陆逊", "class" : "神", "blood" : 4, "skill" : [ "攻心","联营" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b5"), "name" : "tomcatBbzzzs", "class" : "神", "blood" : 9999, "skill" : ["万象", "神迹", "天惩", "严刑", "大雾", "神火", "天雷", "烈酒", "桃园", "灭技" ], "sex" : "男" }



@演示一下:查看所属势力不属于魏蜀吴和群的英雄信息
[console]> db.hero.find({
	"class":{
		"$nin":["魏","蜀","吴","群"]
	}
})

	{ "_id" : ObjectId("5d42f61f0880128cece0f0b2"), "name" : "神吕布", "class" : "神", "blood" : 5, "skill" : [ "无双","修罗", "无谋", "骁勇" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b3"), "name" : "神诸葛亮", "class" : "神", "blood" : 3, "skill" : [ "七星", "狂风", "大雾" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b4"), "name" : "神陆逊", "class" : "神", "blood" : 4, "skill" : [ "攻心","联营" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b5"), "name" : "tomcatBbzzzs", "class" : "神", "blood" : 9999, "skill" : ["万象", "神迹", "天惩", "严刑", "大雾", "神火", "天雷", "烈酒", "桃园", "灭技" ], "sex" : "男" }




数组查询,mongodb可以存放数组.肯定也可以针对数据进行操作($all,$size,$slice,$eleMatch)

@查询同时存在"七星"和"狂风"技能的英雄
[console]> db.hero.find({
	"skill":{
		"$all":["七星","狂风"]
	}
})

	{
        "_id" : ObjectId("5d42f61f0880128cece0f0b3"),
        "name" : "神诸葛亮",
        "class" : "神",
        "blood" : 3,
        "skill" : [
                "七星",
                "狂风",
                "大雾"
        ],
        "sex" : "男"
    }




@查询所有英雄的第一个技能是屯田的,并且不显示_id
[console] >db.hero.find({"skill.0":"屯田"},{"_id":0})
	{ "name" : "邓艾", "class" : "蜀", "blood" : 4, "skill" : [ "屯田" ], "sex" : "男" }



@查询skill的个数是2的所有英雄
[console] >db.hero.find({
	"skill":{
		"$size":2
	}
});
	
	{ "_id" : ObjectId("5d42f61f0880128cece0f0ac"), "name" : "貂蝉", "class" : "群", "blood" :3, "skill" : [ "闭月", "离间" ], "sex" : "女" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0ae"), "name" : "陆逊", "class" : "吴", "blood" :3, "skill" : [ "联营", "谦逊" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b1"), "name" : "郭嘉", "class" : "魏", "blood" :3, "skill" : [ "天妒", "遗计" ], "sex" : "男" }
	{ "_id" : ObjectId("5d42f61f0880128cece0f0b4"), "name" : "神陆逊", "class" : "神", "blood": 4, "skill" : [ "攻心", "联营" ], "sex" : "男" }


@查询所有的神将,不过只显示他们的前2个技能.不显示id
[console]> db.hero.find(
	{"class":"神"},
	{"skill":
		{"$slice":2},
		"_id":0}
);


	{ "name" : "神吕布", "class" : "神", "blood" : 5, "skill" : [ "无双", "修罗" ], "sex" : "男" }
	{ "name" : "神诸葛亮", "class" : "神", "blood" : 3, "skill" : [ "七星", "狂风" ], "sex" :"男" }
	{ "name" : "神陆逊", "class" : "神", "blood" : 4, "skill" : [ "攻心", "联营" ], "sex" : "男" }
	{ "name" : "tomcatBbzzzs", "class" : "神", "blood" : 9999, "skill" : [ "万象", "神迹" ], "sex" : "男" }

@查询所有的神将,显示他们的名称和他们第2个第3个技能
[console]> db.hero.find(
	{"class":"神"},
	{"skill":
		{"$slice":[1,2]},   //这里的slice的[1,2]表示跳过1个,返回2，3.如果是slice:-2表示最后2个
		"name":1,
		"_id":0
	}
);

	{ "name" : "神吕布", "skill" : [ "修罗", "无谋" ] }
	{ "name" : "神诸葛亮", "skill" : [ "狂风", "大雾" ] }
	{ "name" : "神陆逊", "skill" : [ "联营" ] }
	{ "name" : "tomcatBbzzzs", "skill" : [ "神迹", "天惩" ] }


@注意,查询数组的长度>多少是比较难的.因为mongodb不能支持$size:{$gt:2}
我们可以使用Where:this.array.length>2 或者 还有一个折中的方法 array.2:$exists:1

查询技能数量大于2个的英雄,这里的思路就是这个数组存在第3个内容
[console]> db.hero.find({"skill.2":{"$exists":1}})
	
	{ "_id" : ObjectId("5d46d803151a555ecd3bab59"), "name" : "tomcatBbzzzs", "class" : "神", "blood" : 9999, "skill" : [ "万象", "神迹", "天惩", "严刑", "大雾", "神火", "天雷", "烈酒", "桃园", "灭技" ], "sex" : "男" }

/**
 	***********************
 	**mongodb数组嵌套运算**
	***********************
	*/
//这里重新插入数据
[console]> db.hero.insert([
	{
		"_id":1,
		"name":"路飞",
		"parent":[
				{
					"name":"索隆",
					"parent":[
							{
								"name":"山治",
							},
							{
								"name":"路飞",
							}
					]
				},
				{
					"name":"山治",
					"parent":[
							{
								"name":"美女",
							},
							{
								"name":"路飞",
							}
					]
				}
			]
	}
]);


@查询出路飞的朋友们中名称山治的数据
[console] >db.hero.find({
	"parent":{
		"$elemMatch":{
			"name":"山治"
		}
	}
});

	这样就可以找到


@获取到路飞的朋友们中的朋友的数量是2个的朋友数据
[console]> db.hero.find(
	{
		"parent":{
			"$elemMatch":{
				"parent":{
					"$size":2
				}
			}
		}
	}
	,
	{"parent":1}
).pretty();


	{

        "_id" : 1,
        "parent" : [
                {
                        "name" : "索隆",
                        "parent" : [
                                {"name" : "山治"},
                                {"name" : "路飞"}
                        ]
                },
                {
                        "name" : "山治",
                        "parent" : [
                                {"name" : "美女"},
                                {"name" : "路飞" }
                        ]
                }
        ]
	}





//判断某个字段是否存在($exists,但设置为true表示存在,false不存在)
@查询具有技能的英雄的名字
[console] >db.hero.find(
	{
		"skill":{
			"$exists":true
		}
	},
	{
		"name":1,
		"_id":0
	}
)

	{ "name" : "邓艾" }
	{ "name" : "袁术" }
	{ "name" : "貂蝉" }
	{ "name" : "孙策" }
	{ "name" : "陆逊" }
	{ "name" : "袁绍" }
	{ "name" : "曹操" }
	{ "name" : "郭嘉" }
	{ "name" : "神吕布" }
	{ "name" : "神诸葛亮" }
	{ "name" : "神陆逊" }
	{ "name" : "tomcatBbzzzs" }



@查询具有'万象'这个技能的英雄(已经重新插入三国数据,数组用$in:['包含元素'])
[console] >db.hero.find(
	{
		"skill":{
			"$in":['万象']
		}
});

	{ "_id" : ObjectId("5d46d803151a555ecd3bab59"), "name" : "tomcatBbzzzs", "class" : "神", "blood" : 9999, "skill" : [ "万象", "神迹", "天惩", "严刑", "大雾", "神火", "天雷", "烈酒",
 "桃园", "灭技" ], "sex" : "男" }




Where(条件过滤,这个对于关系型数据库的人比较友善),$Where,注意使用$where的话,必须使用this.属性来进行判断

@查询血量大于3的英雄
[console]> db.hero.find({
	"$where":"this.blood>3"
}，{"_id":0,"name":1})


	{ "_id" : ObjectId("5d46d803151a555ecd3bab4e"), "name" : "邓艾", "class" : "蜀", "blood" : 4, "skill" : [ "屯田" ], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab4f"), "name" : "袁术", "class" : "群", "blood" :4, "skill" : [ "妄尊" ], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab51"), "name" : "孙策", "class" : "吴", "blood" : 4, "skill" : [ "妄尊" ], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab53"), "name" : "袁绍", "class" : "群", "blood" : 4, "skill" : [ "乱箭" ], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab54"), "name" : "曹操", "class" : "魏", "blood" :4, "skill" : [ "枭雄" ], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab56"), "name" : "神吕布", "class" : "神", "blood": 5, "skill" : [ "无双", "修罗", "无谋", "骁勇" ], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab58"), "name" : "神陆逊", "class" : "神", "blood": 4, "skill" : [ "攻心", "联营" ], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab59"), "name" : "tomcatBbzzzs", "class" : "神", "blood" : 9999, "skill" : [ "万象", "神迹", "天惩", "严刑", "大雾", "神火", "天雷", "烈酒",
	 "桃园", "灭技" ], "sex" : "男" }


@$where是可以省略的
[console]> db.hero.find("this.blood>3")
	
	运行结果和上面的一样


其实这个where是对每一行的数据进行判断,如果数据量比较大的话,不推荐使用.这个this.blood大于3其实就是一个函数.$where就配合函数使用的


@这里来一首function
[console]> db.hero.find(function(){
	return this.skill.length>2;
});

	{ "_id" : ObjectId("5d46d803151a555ecd3bab56"), "name" : "神吕布", "class" : "神", "blood": 5, "skill" : [ "无双", "修罗", "无谋", "骁勇" ], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab57"), "name" : "神诸葛亮", "class" : "神", "blod" : 3, "skill" : [ "七星", "狂风", "大雾" ], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab59"), "name" : "tomcatBbzzzs", "class" : "神","blood" : 9999, "skill" : [ "万象", "神迹", "天惩", "严刑", "大雾", "神火", "天雷", "烈酒"
 "桃园", "灭技" ], "sex" : "男" }

但是使用这样的方式会将bson转换为js,bson就是存放的数据。这样的方式是不方便使用数据库索引的





模糊查询(正则运算)
mongo中想要实现模糊查询,必须使用正则表达式
普通语法
	{key:正则标记}
完整语法
	{key:{
		"$regex":正则标记,
		"$options":选项
	}}

	对于$options来说主要是设置正则的信息查询的标记:
		-i    忽略字母大小写
		-m    多行查找
		-x    空白字符串除了被转义的或在字符中意外的完全被忽略
		-s    匹配所有的字符(圆点,“.”),包括换行内容

	需要注意的是,如果是直接使用普通语法,那么只能使用i和m


@查询姓'刘'的英雄
[console] > db.hero.find({"name":/刘/}).pretty()
	这里没有找到数据

@查询姓名包括'艾'的英雄
[console] >db.hero.find({"name":/艾/i}).pretty()

	{
        "_id" : ObjectId("5d46d803151a555ecd3bab4e"),
        "name" : "邓艾",
        "class" : "蜀",
        "blood" : 4,
        "skill" : [
                "屯田"
        ],
        "sex" : "男"
	}


查询数组数据
@查询技能包括'心'字的
[console] >db.hero.find({"skill":/心/}).pretty()

	{
        "_id" : ObjectId("5d46d803151a555ecd3bab58"),
        "name" : "神陆逊",
        "class" : "神",
        "blood" : 4,
        "skill" : [
                "攻心",
                "联营"
        ],
        "sex" : "男"
	}


数据排序
@我们可以使用sort()函数进行排序,升序是(1),降序是(-1)
[console] >db.hero.find({},{"blood":1,"name":1,"_id":0}).sort({"blood":1})

	{ "name" : "貂蝉", "blood" : 3 }
	{ "name" : "陆逊", "blood" : 3 }
	{ "name" : "郭嘉", "blood" : 3 }
	{ "name" : "神诸葛亮", "blood" : 3 }
	{ "name" : "邓艾", "blood" : 4 }
	{ "name" : "袁术", "blood" : 4 }
	{ "name" : "孙策", "blood" : 4 }
	{ "name" : "袁绍", "blood" : 4 }
	{ "name" : "曹操", "blood" : 4 }
	{ "name" : "神陆逊", "blood" : 4 }
	{ "name" : "神吕布", "blood" : 5 }
	{ "name" : "tomcatBbzzzs", "blood" : 9999 }

自然排序,按照数据保存的现后进行排序($natural)
[console] >db.hero.find({},{"blood":1,"name":1,"_id":0}).sort({"$natural":1})

	{ "name" : "邓艾", "blood" : 4 }
	{ "name" : "袁术", "blood" : 4 }
	{ "name" : "貂蝉", "blood" : 3 }
	{ "name" : "孙策", "blood" : 4 }
	{ "name" : "陆逊", "blood" : 3 }
	{ "name" : "袁绍", "blood" : 4 }
	{ "name" : "曹操", "blood" : 4 }
	{ "name" : "郭嘉", "blood" : 3 }
	{ "name" : "神吕布", "blood" : 5 }
	{ "name" : "神诸葛亮", "blood" : 3 }
	{ "name" : "神陆逊", "blood" : 4 }
	{ "name" : "tomcatBbzzzs", "blood" : 9999 }


数据分页显示
	skip(n)		跳过的数据4
	limit(n)		显示的数据

	pageNo:2,pageSize:5
[console] >db.hero.find({},{"blood":1,"name":1,"_id":0}).skip(5).limit(5)

	{ "name" : "袁绍", "blood" : 4 }
	{ "name" : "曹操", "blood" : 4 }
	{ "name" : "郭嘉", "blood" : 3 }
	{ "name" : "神吕布", "blood" : 5 }
	{ "name" : "神诸葛亮", "blood" : 3 }





/**
 	**********************
 	****mongod更新操作****
	**********************
	*/
(MongoDB)更新操作
mongo中不推荐使用数据更新操作,最好的方法就是删除后重新插入。当然也存在更新
save() 和 update()

		db.集合.updae(更新条件,新的对象数据(允许更新操作符),upsert,multi);
			upsert:如果存在则更新,不存在则添加

			multi:表示是否只更新满足条件的第一行记录

@更新神吕蒙的技能,'联营' 为 '涉猎'
[console]> db.hero.update({'name':'神吕蒙'},{"$set":"skill":['狩猎','攻心']},true,false);


使用save操作来完成上面的功能
[console]> db.hero.save({"name":'神吕蒙',"skill":['狩猎','攻心']})



/**
 	**********************
 	****mongod修改器****
	**********************
	*/

$inc:主要针对一个数字字段,增加或修改某个数字字段的值
@现在修改'郭嘉'的血量+1
[console] >db.hero.update({"name":"郭嘉"},{"$inc":{"blood":1}});
		
		修改前:
		{ "name" : "邓艾", "blood" : 4 }
		{ "name" : "袁术", "blood" : 4 }
		{ "name" : "貂蝉", "blood" : 3 }
		{ "name" : "孙策", "blood" : 4 }
		{ "name" : "陆逊", "blood" : 3 }
		{ "name" : "袁绍", "blood" : 4 }
		{ "name" : "曹操", "blood" : 4 }
		{ "name" : "郭嘉", "blood" : 3 }
		{ "name" : "神吕布", "blood" : 5 }
		{ "name" : "神诸葛亮", "blood" : 3 }
		{ "name" : "神陆逊", "blood" : 4 }
		{ "name" : "tomcatBbzzzs", "blood" : 9999 }

		修改后:
		{ "name" : "邓艾", "blood" : 4 }
		{ "name" : "袁术", "blood" : 4 }
		{ "name" : "貂蝉", "blood" : 3 }
		{ "name" : "孙策", "blood" : 4 }
		{ "name" : "陆逊", "blood" : 3 }
		{ "name" : "袁绍", "blood" : 4 }
		{ "name" : "曹操", "blood" : 4 }
		{ "name" : "郭嘉", "blood" : 4 }
		{ "name" : "神吕布", "blood" : 5 }
		{ "name" : "神诸葛亮", "blood" : 3 }
		{ "name" : "神陆逊", "blood" : 4 }
		{ "name" : "tomcatBbzzzs", "blood" : 9999 }



$set:对值进行重新设置,之前已经演示过了



/**
 	**********************
 	****mongod删除操作****
	**********************
	*/
清空hero集合中的内容
[console] >db.hero.remove({});	//必须传入条件

[console] >db.hero.remove({},true); //只删除满足条件的第一条数据

[console] >db.hero.remove({"name":/神/});	//删除姓名中包含神的所有英雄

	{ "name" : "邓艾" }
	{ "name" : "袁术" }
	{ "name" : "貂蝉" }
	{ "name" : "孙策" }
	{ "name" : "陆逊" }
	{ "name" : "袁绍" }
	{ "name" : "曹操" }
	{ "name" : "郭嘉" }
	{ "name" : "tomcatBbzzzs" }




/**
 	**********************
 	****Mongodb的游标*****
	**********************
	*/

var cursor=db.hero.find();
while(cursor.hasNext()){
	var curVal=cursor.next();
	print(curVal)
}

	[object BSON]
	[object BSON]
	[object BSON]
	[object BSON]
	[object BSON]
	[object BSON]
	[object BSON]
	[object BSON]
	[object BSON]


如果想让结果以json的形式出现,就使用printjson
var cursor=db.hero.find();
while(cursor.hasNext()){
	var curVal=cursor.next();
	printjson(curVal)
}


	{
        "_id" : ObjectId("5d46d803151a555ecd3bab53"),
        "name" : "袁绍",
        "class" : "群",
        "blood" : 4,
        "skill" : [
                "乱箭"
        ],
        "sex" : "男"
	},
	...



/**
 	**********************
 	****Mongodb的索引*****
	**********************
	*/
在任何数据库中,索引都是一种提升性能的手段,这一点在MongoDB数据库中也是同样存在的,
在MondoDB数据库中也存在2中所以创建:
	1.MongoDb自己创建的索引
	2.我们手动创建的索引

@查询默认状态下的hero集合的索引内容
[console] >db.hero.getIndexes();
	
	[
        {
                "v" : 2,		//索引版本
                "key" : {
                        "_id" : 1  //索引排序方式,1是升序,-1是降序
                },
                "name" : "_id_",	//自动在字段前面加一个下划线_
                "ns" : "sgs.hero"
        }
	]

如果我们需要自己创建自己的索引
	索引创建:db.集合名称.ensureIndex({列:1})  //表示索引安装升序的方式进行排列


@创建一个索引,使用血量来做索引条件[当然,这样很不好]
[console] >db.hero.ensureIndex({"blood":-1})

	{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
	}

注意,此时并没有设置索引的名字
[console] >db.hero.getIndexes()
	
	[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "sgs.hero"
        },
        {
                "v" : 2,
                "key" : {
                        "blood" : -1
                },
                "name" : "blood_-1",
                "ns" : "sgs.hero"
        }
	]

索引的名称的字段规范是:字段名称_索引排序模式


@查看索引分析
[console] >db.hero.find({"blood":4}).explain()
	
	{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "sgs.hero",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "blood" : {
                                "$eq" : 4  
                        }
                },
                "winningPlan" : {
                    "stage" : "FETCH",
                    "inputStage" : {
                            "stage" : "IXSCAN",
                            "keyPattern" : {
                                    "blood" : -1 //降序
                            },
                            "indexName" : "blood_-1",
                            "isMultiKey" : false,
                            "multiKeyPaths" : {
                                    "blood" : [ ]
                            },
                            "isUnique" : false,
                            "isSparse" : false,
                            "isPartial" : false,
                            "indexVersion" : 2,
                            "direction" : "forward",
                            "indexBounds" : {
                                    "blood" : [
                                            "[4.0, 4.0]"
                                    ]
                                }
                        }
	                },
	                "rejectedPlans" : [ ]
	        },
	        "serverInfo" : {
	                "host" : "DESKTOP-E0PHB4G",
	                "port" : 27017,
	                "version" : "4.0.10",
	                "gitVersion" : "c389e7f69f637f7a1ac3cc9fae843b635f20b766"
	        },
	        "ok" : 1
	}


	此时的查询就使用了索引的技术	



不使用索引
[console] >db.hero.find({"skill":{
	"$size":{
		"$gt":2
	}
}})


	{ "_id" : ObjectId("5d46d803151a555ecd3bab50"), "name" : "貂蝉", "class" : "群", "blood" : 3, "skill" : [ "闭月", "离间"], "sex" : "女" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab52"), "name" : "陆逊", "class" : "吴", "blood" : 3, "skill" : [ "联营", "谦逊"], "sex" : "男" }
	{ "_id" : ObjectId("5d46d803151a555ecd3bab55"), "name" : "郭嘉", "class" : "魏", "blood" : 4, "skill" : [ "天妒", "遗计"], "sex" : "男" }


	现在就是全局查询


@删除索引
[console] >db.hero.dropIndex({"字段":"索引名称"})


/**
 	**************************
 	****Mongodb的唯一索引*****
	**************************
	*/
@创建一个唯一索引
[console] >db.hero.ensureIndex(
	{"name":1},
	{"unique":true}
)

现在name这个字段就是唯一的了,当尝试插入重复的数据是就会报错


/**
 	**************************
 	****Mongodb的过期索引*****
	**************************
	*/
类似于redis中的带时间的key,指定时间后索引就会被删除.不过Mongo的实时性比较差,
不能做到精确到秒。也就是说,预计活到8点钟的索引可能会在8点5分才会被杀掉

如果需要实现过期索引,必须保存一个时间信息
[console]> db.phones.insert([
	{"tel":"110","code":110,"time":new Date()},
	{"tel":"111","code":111,"time":new Date()},
	{"tel":"112","code":112,"time":new Date()},
	{"tel":"113","code":113,"time":new Date()},
	{"tel":"114","code":114,"time":new Date()},
])

	{ "_id" : ObjectId("5d4c1396ba7b6e38972bd860"), "tel" : "110", "code" : 110, "time" : ISODate("2019-08-08T12:20:38.729Z") }
	{ "_id" : ObjectId("5d4c1396ba7b6e38972bd861"), "tel" : "111", "code" : 111, "time" : ISODate("2019-08-08T12:20:38.729Z") }
	{ "_id" : ObjectId("5d4c1396ba7b6e38972bd862"), "tel" : "112", "code" : 112, "time" : ISODate("2019-08-08T12:20:38.729Z") }
	{ "_id" : ObjectId("5d4c1396ba7b6e38972bd863"), "tel" : "113", "code" : 113, "time" : ISODate("2019-08-08T12:20:38.729Z") }
	{ "_id" : ObjectId("5d4c1396ba7b6e38972bd864"), "tel" : "114", "code" : 114, "time" : ISODate("2019-08-08T12:20:38.729Z") }


设置索引10s后过期
[console]> db.phones.ensureIndex({"time":1},{expireAfterSeconds:10})

	> db.phones.find()
	>	//此时无数据了


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

//现在插入重复信息
[console]> db.oneprice.insert([
	{"name":"罗罗罗亚*索隆","class":"S","sex":"男"},
	{"name":"山治","class":"S","sex":"男"},
	{"name":"路飞","class":"S","sex":"男"},
	{"name":"乔巴","class":"A","sex":"男"},
	{"name":"乌索普","class":"A","sex":"男"},
	{"name":"娜美","class":"A","sex":"女"},
	{"name":"弗兰奇","class":"A","sex":"男"}
]);
	
	console==>
	BulkWriteResult({
		"writeErrors" : [ ],
		"writeConcernErrors" : [ ],
		"nInserted" : 7,
		"nUpserted" : 0,
		"nMatched" : 0,
		"nModified" : 0,
		"nRemoved" : 0,
		"upserted" : [ ]
	})

//distinct必须在runCommand中执行,并且必须指定集合以及去重的列
[console]> db.runCommand({"distinct":"oneprice","key":"sex"});
	console==>
	{ "values" : [ "男", "女" ], "ok" : 1 }
	//感觉意义不大




group操作,使用group可以实现数据的分组,在mongo中会将集合中的不同的key进行分组.并产生一个处理结果
@查询"class"="A"的信息,并且安装"sex"分组
[console]> db.runCommand(
	{"group":
		{
			"ns":"oneprice", 							//集合操作
			"key":{"sex":true}, 						//分组的键
			"initial":{"count":0},				//初始化数量
			"condition":{"class":"A"},			//条件
			"$reduce":function(doc,prev){	//聚合表达式
				print(doc,prev);
			}
		}
	}
);

	console==>
	{
		"retval" : [
			{
				"sex" : "男",
				"count" : 0
			},
			{
				"sex" : "女",
				"count" : 0
			}
		],
		"count" : NumberLong(4),
		"keys" : NumberLong(2),
		"ok" : 1
	}


[console]> db.runCommand(
	{"group":
		{
			"ns":"oneprice", 							
			"key":{"sex":true}, 						
			"initial":{"count":0},				
			"condition":{"class":"A"},			
			"$reduce":function(doc,prev){	
				prev.count++;
			}
		}
	}
);

//这个东西是底层的,所以不会用这个东西写


#MapReduce
/**大数据的核心,实际上别用这个东西*/
/**
	Map:将数据取出,
	Reduce:负责数据的最后的处理
	但是在MongoDB中实现MapReduce的话,成本太高了.
*/

//重新插入数据
[console]> db.emps.insert([
	{"name":"张三","age":30,"sex":"女","desc":"路人已",},
	{"name":"李四","age":31,"sex":"女","desc":"路人甲"},
	{"name":"王五","age":29,"sex":"女","desc":"路人丙"},
	{"name":"赵四","age":50,"sex":"男","desc":"气质这一块,把握的是死死的"},
	{"name":"刘能","age":52,"sex":"男","desc":"广坤,赵四都不如我"},
	{"name":"广坤","age":51,"sex":"男","desc":"超越陈坤,杨坤,蔡徐坤"},
]);

	console==>
	...

@按照"sex"进行分组,取得每个性别的人名
//1.编写分组的定义
var jobMapFun=function(){
	emit(this.sex,this.name); //按照sex分组,取出name
};

第一组:{"key":"女":"name":["张三","李四","王五"]}

@编写reduce操作
var jobReduceFun=function(key,values){
	return {"sex":key,"names":values};
}

db.runCommand({
	"mapreduce":"emps",
	"map":jobMapFun,
	"reduce":jobReduceFun,
	"out":"t_tmp_emps" //指定输出结果表
});

	console==>
	{
		"result" : "t_tmp_emps",	//输出结果表
		"timeMillis" : 86,
		"counts" : {
			"input" : 6,
			"emit" : 6,
			"reduce" : 2,
			"output" : 2
		},
		"ok" : 1
	}


@现在我们开看一下t_tmp_emps的内容
[console]> db.t_tmp_emps.find()
	console==>
	{ "_id" : "女", "value" : { "sex" : "女", "names" : [ "张三", "李四", "王五" ] } }
	{ "_id" : "男", "value" : { "sex" : "男", "names" : [ "赵四", "刘能", "广坤" ] } }


//我们还可以对数据进行处理
var jobFinalizeFn=function(key,val){
	if(key=="女"){
		return {"sex":key,"names":val,"info":"这是位女同志"};
	}
	return {"sex":key,"names":val};
};


@现在继续重新聚合
db.runCommand({
	"mapreduce":"emps",
	"map":jobMapFun,
	"reduce":jobReduceFun,
	"out":"out_job_emp",
	"finalize":jobFinalizeFn
});

	console==>
	{
		"result" : "out_job_emp",
		"timeMillis" : 58,
		"counts" : {
			"input" : 6,
			"emit" : 6,
			"reduce" : 2,
			"output" : 2
		},
		"ok" : 1
	}



@查看结果表
[console]> db.out_job_emp.find()
	console==>
	{ "_id" : "女", "value" : { "sex" : "女", "names" : { "sex" : "女", "names" : [ "张三", "李四", "王五" ] }, "info" : "这是位女同志" } }
	{ "_id" : "男", "value" : { "sex" : "男", "names" : { "sex" : "男", "names" : [ "赵四", "刘能", "广坤" ] } } }



@统计出各个性别的人数,平均年龄,最大年龄
	{"name":"张三","age":30,"sex":"女","desc":"路人已"}
	{"name":"李四","age":31,"sex":"女","desc":"路人甲"}
	{"name":"王五","age":29,"sex":"女","desc":"路人丙"}
	{"name":"赵四","age":50,"sex":"男","desc":"气质这一块,把握的是死死的"}
	{"name":"刘能","age":52,"sex":"男","desc":"广坤,赵四都不如我"}
	{"name":"广坤","age":51,"sex":"男","desc":"超越陈坤,杨坤,蔡徐坤"}

//Map
var sexMapFun=function(){
	//分组条件,一个每个集合取出的内容
	emit(this.sex,{"count":1,"avg":this.age,"max":this.age});
};

//Reduce
var sexReduceFun=function(key,vals){
	var total=0; //统计
	var sum=0;     //计算平均年龄
	var max=vals[0].max;
	for(var x in vals){
		total+=vals[x].count; //人数增加
		
		sum+=vals[x].avg;  //累加

		//获取最大值
		if(vals[x].max>max){
			max=vals[x].max;
		}       
	}
	sum=sum/total; //求平均值
	return {"count":total,"avg":sum,"max":max}; //返回最终结果
};

//Commit
db.runCommand({
	"mapreduce":"emps",
	"map":sexMapFun,
	"reduce":sexReduceFun,
	"out":"t_sex_emp"
});

	console==>
	{
		"result" : "t_sex_emp",
		"timeMillis" : 50,
		"counts" : {
			"input" : 6,
			"emit" : 6,
			"reduce" : 2,
			"output" : 2
		},
		"ok" : 1
	}


@查看运行结果
[console]> db.t_sex_emp.find();
	{ "_id" : "女", "value" : { "count" : 3, "avg" : 30, "max" : 31 } }
	{ "_id" : "男", "value" : { "count" : 3, "avg" : 51, "max" : 52 } }








*******************
***    聚合框架     ***
*******************

$group
//MongoDB2之后提供的聚合函数.group(分组的数据操作)

@根据性别进行分组,然后求人的总共数量
//之前的数据
	{"name":"张三","age":30,"sex":"女","desc":"路人已"}
	{"name":"李四","age":31,"sex":"女","desc":"路人甲"}
	{"name":"王五","age":29,"sex":"女","desc":"路人丙"}
	{"name":"赵四","age":50,"sex":"男","desc":"气质这一块,把握的是死死的"}
	{"name":"刘能","age":52,"sex":"男","desc":"广坤,赵四都不如我"}
	{"name":"广坤","age":51,"sex":"男","desc":"超越陈坤,杨坤,蔡徐坤"}

[console]>db.emps.aggregate([
		{
			"$group":{
				"_id":"$sex", //按照sex进行分组
				"count":{
					"$sum":1		//统计人数,这个地方其实是累加计数
				}
			}
		}
	]);

	console==>
	{ "_id" : "男", "count" : 3 }
	{ "_id" : "女", "count" : 3 }



@根据性别进行分组,然后对年龄进行求和
[console]>db.emps.aggregate([
		{
			"$group":{
				"_id":"$sex",
				"count":{
					"$sum":"$age"
				}
			}
		}
	]);

	console==>
	{ "_id" : "男", "count" : 153 }
	{ "_id" : "女", "count" : 90 }



@计算出性别的平均年龄
[console]> db.emps.aggregate([
		{
			"$group":{
				"_id":"$sex",
				"count":{
					"$avg":"$age"
				}
			}
		}
	]);
	
	console==>
	{ "_id" : "男", "count" : 153 }
	{ "_id" : "女", "count" : 90 }


	{"name":"张三","age":30,"sex":"女","desc":"路人已"}
	{"name":"李四","age":31,"sex":"女","desc":"路人甲"}
	{"name":"王五","age":29,"sex":"女","desc":"路人丙"}
	{"name":"赵四","age":50,"sex":"男","desc":"气质这一块,把握的是死死的"}
	{"name":"刘能","age":52,"sex":"男","desc":"广坤,赵四都不如我"}
	{"name":"广坤","age":51,"sex":"男","desc":"超越陈坤,杨坤,蔡徐坤"}

@求最高和最低年龄
[console]> db.emps.aggregate([
		{
			"$group":{
				"_id":"$sex",
				"max_age":{"$max":"$age"},
				"min_age":{"$min":"$age"}
			}
		}
	]);

	console==>
	{ "_id" : "男", "max_age" : 52, "min_age" : 50 }
	{ "_id" : "女", "max_age" : 31, "min_age" : 29 }



@统计每个性别的人名
[console]> db.emps.aggregate([
		{
			"$group":{
				"_id":"$sex",
				"result":{
					"$push":"$name"
				}
			}
		}
	]);
	
	console==>
	{ "_id" : "男", "result" : [ "赵四", "刘能", "广坤" ] }
	{ "_id" : "女", "result" : [ "张三", "李四", "王五" ] }



@在上面的基础上,只保存第一个内容
[console]> db.emps.aggregate([
		{
			"$group":{
				"_id":"$sex",
				"result":{
					"$first":"$name"
				}
			}
		}
	]);            

	console==>
	{ "_id" : "男", "result" : "赵四" }
	{ "_id" : "女", "result" : "张三" }

@在上上面的基础上,只保留最后一个内容
[console]> db.emps.aggregate([
		{
			"$group":{
				"_id":"$sex",
				"result":{
					"$last":"$name"
				}
			}
		}
	]);            

	console==>
	{ "_id" : "男", "result" : "广坤" }
	{ "_id" : "女", "result" : "王五" }






$project
//可以利用"$project"来控制数据列的显示规则,那么可以执行的规则如下:
	|--- 普通列: 
		({成员:1|true})  表示需要显示的内容

	|--- _id 列:
		({"_id":0|false}) 表示"_Id"列是否显示

	|-- 条件过滤列:
		({成员:表达式})	满足表达式之后的数据是否可以进行显示.

@只显示"name"列,不显示"_id"列
//之前的数据:
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f3267"), "name" : "张三", "age" : 30, "sex" : "女", "desc" : "路人已" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f3268"), "name" : "李四", "age" : 31, "sex" : "女", "desc" : "路人甲" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f3269"), "name" : "王五", "age" : 29, "sex" : "女", "desc" : "路人丙" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f326a"), "name" : "赵四", "age" : 50, "sex" : "男", "desc" : "气质这一块,把握的是死死的" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f326b"), "name" : "刘能", "age" : 52, "sex" : "男", "desc" : "广坤,赵四都不如我" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f326c"), "name" : "广坤", "age" : 51, "sex" : "男", "desc" : "超越陈坤,杨坤,蔡徐坤" }


[console]> db.emps.aggregate([
	{
		"$project":{
			"_id":0,
			"name":1
		}
	}
]);

	console==>
	{ "name" : "张三" }
	{ "name" : "李四" }
	{ "name" : "王五" }
	{ "name" : "赵四" }
	{ "name" : "刘能" }
	{ "name" : "广坤" }




//可以在投影列中做四则运算($add),($substract),(乘:$multiply),(除:$divide),(余:$mod)
[console]> db.emps.aggregate([
		{
			"$project":{
				"_id":0,
				"name":1,
				"age":1,
				"sex":1
			}
		}
	]);

	console==>
	{ "name" : "张三", "age" : 30, "sex" : "女" }
	{ "name" : "李四", "age" : 31, "sex" : "女" }
	{ "name" : "王五", "age" : 29, "sex" : "女" }
	{ "name" : "赵四", "age" : 50, "sex" : "男" }
	{ "name" : "刘能", "age" : 52, "sex" : "男" }
	{ "name" : "广坤", "age" : 51, "sex" : "男" }


//带别名输出
[console]> db.emps.aggregate([
		{
			"$project":{
				"_id":0,
				"name":1,
				"age":1,
				"性别":"$sex"
			}
		}
	]);
	
	console==>
	{ "name" : "张三", "age" : 30, "性别" : "女" }
	{ "name" : "李四", "age" : 31, "性别" : "女" }
	{ "name" : "王五", "age" : 29, "性别" : "女" }
	{ "name" : "赵四", "age" : 50, "性别" : "男" }
	{ "name" : "刘能", "age" : 52, "性别" : "男" }
	{ "name" : "广坤", "age" : 51, "性别" : "男" }



@求100年以后的人的年龄
[console]> db.emps.aggregate([
		{
			"$project":{
				"_id":0,
				"name":1,
				"年龄+100":{
					"age":{
						"$add":["$age",100]
					}
				},
				"sex":"$sex"
			}
		}
	]);

	console==>
	{ "name" : "张三", "年龄+100" : { "age" : 130 }, "sex" : "女" }
	{ "name" : "李四", "年龄+100" : { "age" : 131 }, "sex" : "女" }
	{ "name" : "王五", "年龄+100" : { "age" : 129 }, "sex" : "女" }
	{ "name" : "赵四", "年龄+100" : { "age" : 150 }, "sex" : "男" }
	{ "name" : "刘能", "年龄+100" : { "age" : 152 }, "sex" : "男" }
	{ "name" : "广坤", "年龄+100" : { "age" : 151 }, "sex" : "男" }

	

//除了四则运算还有关系运算.大于($cmp),等于($eq),大于($gt),大于等于($gte),小于($lt),
//	不等于($ne),判断NULL.这些返回的结果都是boolean
	
//还有($or,$and,$not)
//$concat,$substr,$toLower,

@查询出年龄大于50岁以上的人的
[console]> db.emps.aggregate([
		{
			"$project":{
				"_id":0,
				"name":1,
				"sex":1,
				"age":1,
				"result":{
					"$gte":["$age",50]
				}
			}
		}
	]);

	console==>
	{ "name" : "张三", "age" : 30, "sex" : "女", "result" : false }
	{ "name" : "李四", "age" : 31, "sex" : "女", "result" : false }
	{ "name" : "王五", "age" : 29, "sex" : "女", "result" : false }
	{ "name" : "赵四", "age" : 50, "sex" : "男", "result" : true }
	{ "name" : "刘能", "age" : 52, "sex" : "男", "result" : true }
	{ "name" : "广坤", "age" : 51, "sex" : "男", "result" : true }





$sort
//使用"$sort"可以实现,1表示升学,-1表示降序
@对指定字段进行排序
	//之前的数据
	{"name":"张三","age":30,"sex":"女","desc":"路人已"}
	{"name":"李四","age":31,"sex":"女","desc":"路人甲"}
	{"name":"王五","age":29,"sex":"女","desc":"路人丙"}
	{"name":"赵四","age":50,"sex":"男","desc":"气质这一块,把握的是死死的"}
	{"name":"刘能","age":52,"sex":"男","desc":"广坤,赵四都不如我"}
	{"name":"广坤","age":51,"sex":"男","desc":"超越陈坤,杨坤,蔡徐坤"}

[console]> db.emps.aggregate([
		{
			"$sort":{
				"age":-1
			}
		}
	]);

	console==>
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f326b"), "name" : "刘能", "age" : 52, "sex" : "男", "desc" : "广坤,赵四都不如我" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f326c"), "name" : "广坤", "age" : 51, "sex" : "男", "desc" : "超越陈坤,杨坤,蔡徐坤" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f326a"), "name" : "赵四", "age" : 50, "sex" : "男", "desc" : "气质这一块,把握的是死死的" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f3268"), "name" : "李四", "age" : 31, "sex" : "女", "desc" : "路人甲" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f3267"), "name" : "张三", "age" : 30, "sex" : "女", "desc" : "路人已" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f3269"), "name" : "王五", "age" : 29, "sex" : "女", "desc" : "路人丙" }

	


//之前的数据
{ "_id" : ObjectId("5d5204e7d3e99828bf5f3267"), "name" : "张三", "age" : 30, "sex" : "女", "desc" : "路人已" }
{ "_id" : ObjectId("5d5204e7d3e99828bf5f3268"), "name" : "李四", "age" : 31, "sex" : "女", "desc" : "路人甲" }
{ "_id" : ObjectId("5d5204e7d3e99828bf5f3269"), "name" : "王五", "age" : 29, "sex" : "女", "desc" : "路人丙" }
{ "_id" : ObjectId("5d5204e7d3e99828bf5f326a"), "name" : "赵四", "age" : 50, "sex" : "男", "desc" : "气质这一块,把握的是死死的" }
{ "_id" : ObjectId("5d5204e7d3e99828bf5f326b"), "name" : "刘能", "age" : 52, "sex" : "男", "desc" : "广坤,赵四都不如我" }
{ "_id" : ObjectId("5d5204e7d3e99828bf5f326c"), "name" : "广坤", "age" : 51, "sex" : "男", "desc" : "超越陈坤,杨坤,蔡徐坤" }


//分页处理
"$limit"
	负责数据的取出个数

"$skip"
	数据的跨过个数
//2个1页,取第2页
[console]> db.emps.aggregate([
		{
			"$project":{
				"_id":0,
				"name":1,
				"age":1,
				"desc":1
			}
		},
		{"$skip":2},
		{"$limit":2}	
	]);
	
	console==>
	{ "name" : "王五", "age" : 29, "desc" : "路人丙" }
	{ "name" : "赵四", "age" : 50, "desc" : "气质这一块,把握的是死死的" }



$unwind
//查询数据时返回的数组信息不方便浏览,所以使用这个可以将数组转换为字符串.
@插入新数据
[console]> db.depts.insert([
		{"title":"技术","bus":["研发","生产","培训"]},
		{"title":"财务","bus":["工资","税收"]}
	]);
	
	console==>
	BulkWriteResult({
		"writeErrors" : [ ],
		"writeConcernErrors" : [ ],
		"nInserted" : 2,
		"nUpserted" : 0,
		"nMatched" : 0,
		"nModified" : 0,
		"nRemoved" : 0,
		"upserted" : [ ]
	})


@使用$unwind
[console]> db.depts.aggregate([
		{
			"$project":{
				"_id":0,
				"title":true,
				"bus":true
			}
		},
		{"$unwind":"$bus"}
	]);
	
	console==>
	{ "title" : "技术", "bus" : "研发" }
	{ "title" : "技术", "bus" : "生产" }
	{ "title" : "技术", "bus" : "培训" }
	{ "title" : "财务", "bus" : "工资" }
	{ "title" : "财务", "bus" : "税收" }





$geoNear
//使用geoNear可以获取附近的坐标点
@插入新数据
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
	...


@获取距离[11,12]最近的点
//首先开启索引
[console]> db.shops.ensureIndex({"loc":"2d"});
	console==>
	{
		"createdCollectionAutomatically" : false,
		"numIndexesBefore" : 1,
		"numIndexesAfter" : 2,
		"ok" : 1
	}


[console]> db.shops.aggregate([
		{
			"$geoNear":{
				"near":[11,12],
				"distanceField":"loc",
				"maxDistance":1,				//最大距离
				"num":2,								//返回数据
				"spherical":true 
			}
		}
	]);
	
	console==>
	{ "_id" : ObjectId("5d54aa66bac1d07722ccedd8"), "loc" : 0.140628651845969 }
	{ "_id" : ObjectId("5d54aa66bac1d07722ccedda"), "loc" : 0.15808122674149488 }




$out
//利用此操作可以将查询结果输出到指定的集合里面
@将投影出来的结果输出到集合中
[console]> db.emps.find();
	console==>
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f3267"), "name" : "张三", "age" : 30, "sex" : "女", "desc" : "路人已" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f3268"), "name" : "李四", "age" : 31, "sex" : "女", "desc" : "路人甲" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f3269"), "name" : "王五", "age" : 29, "sex" : "女", "desc" : "路人丙" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f326a"), "name" : "赵四", "age" : 50, "sex" : "男", "desc" : "气质这一块,把握的是死死的" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f326b"), "name" : "刘能", "age" : 52, "sex" : "男", "desc" : "广坤,赵四都不如我" }
	{ "_id" : ObjectId("5d5204e7d3e99828bf5f326c"), "name" : "广坤", "age" : 51, "sex" : "男", "desc" : "超越陈坤,杨坤,蔡徐坤" }

[console] > db.emps.aggregate([
		{"$project":{"_id":0,"name":1,"sex":1}},
		{"$out":"emp_infos"}
	]);
	
	console==>
	无结果

[console]>db.emp_infos.find();
	console==>
	{ "_id" : ObjectId("5d55e6f7a8634bfb0eb52357"), "name" : "张三", "sex" : "女" }
	{ "_id" : ObjectId("5d55e6f7a8634bfb0eb52358"), "name" : "李四", "sex" : "女" }
	{ "_id" : ObjectId("5d55e6f7a8634bfb0eb52359"), "name" : "王五", "sex" : "女" }
	{ "_id" : ObjectId("5d55e6f7a8634bfb0eb5235a"), "name" : "赵四", "sex" : "男" }
	{ "_id" : ObjectId("5d55e6f7a8634bfb0eb5235b"), "name" : "刘能", "sex" : "男" }
	{ "_id" : ObjectId("5d55e6f7a8634bfb0eb5235c"), "name" : "广坤", "sex" : "男" }



//固定集合操作
限制集合的大小,如果超过了这个长度就会把最早的数据移出.然后保存新的数据


@创建一个固定长度的集合
[console]> db.createCollection("depts",{"capped":true,"size":1024,"max":5});
//capped:true表示固定长度.size:1024表示集合占用的空间容量(字节),max:5表示最多5条记录

@现在插入5条记录
[console]> db.depts.insert([
		{"deptno":10,"dname":"财务部-A","loc":"北京"},
		{"deptno":11,"dname":"财务部-B","loc":"北京"},
		{"deptno":12,"dname":"财务部-C","loc":"北京"},
		{"deptno":13,"dname":"财务部-D","loc":"北京"},
		{"deptno":14,"dname":"财务部-E","loc":"北京"}
	]);

	console==>
	BulkWriteResult({
		"writeErrors" : [ ],
		"writeConcernErrors" : [ ],
		"nInserted" : 5,
		"nUpserted" : 0,
		"nMatched" : 0,
		"nModified" : 0,
		"nRemoved" : 0,
		"upserted" : [ ]
	})

//现在这个集合已经满了,现在我在往里面插入一条数据.那么按照预期结果来说.此时
//这条记录会覆盖掉"财务部-A"的记录,对吗?
@再次插入1条数据
[console]> db.depts.insert([
		{"deptno":15,"dname":"财务部-F","loc":"北京"}
	]);

	console==>
	省略输出结果

//查看集合
[console]> db.depts.find();
	console==>
	{ "_id" : ObjectId("5d55f5ab45c80a1bc74f961e"), "deptno" : 11, "dname" : "财务部-B", "loc" : "北京" }
	{ "_id" : ObjectId("5d55f5ab45c80a1bc74f961f"), "deptno" : 12, "dname" : "财务部-C", "loc" : "北京" }
	{ "_id" : ObjectId("5d55f5ab45c80a1bc74f9620"), "deptno" : 13, "dname" : "财务部-D", "loc" : "北京" }
	{ "_id" : ObjectId("5d55f5ab45c80a1bc74f9621"), "deptno" : 14, "dname" : "财务部-E", "loc" : "北京" }
	{ "_id" : ObjectId("5d55f5b345c80a1bc74f9622"), "deptno" : 15, "dname" : "财务部-F", "loc" : "北京" }


/*
	************
	**用户管理**
	************
*/
MongoDB默认连接是不需要密码的.因为如果要开启密码验证必须满足2个条件:
	条件1:服务器启动的时候开启授权验证
	条件2:需要配置用户名和密码

	但是需要明确的是,如果想要配置用户名和密码一定是针对于一个数据库的,例如现在的tmt用户,那么就首先
	切换到tmt数据库上。

[console]> use tmt;

@创建用户,注意任何用户都必须有一个操作角色,最基础的角色就是:read,write
[console]> db.createUser({
		"user":"tmt",  						//用户名称
		"pwd":"1234",							//密码
		"roles":[								//角色
			{			
				"role":"readWrite",	//读写
				"db":"tmt"						//操作数据库
			}
		]
	});
	
	//db.createUser({"user":"tmt","pwd":"1234","roles":[{"role":"readWrite","db":"tmt"}]});

	console==>
	Successfully added user: {
		"user" : "tmt",
		"roles" : [
			{
				"role" : "readWrite",
				"db" : "tmt"
			}
		]
	}

//此时,必须配置授权.否则用户名无效.也就是说我们需要在MongoDB的mongo.conf中配置授权














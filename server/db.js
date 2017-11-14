const MongoClient = require('mongodb').MongoClient
const settings = require('../settings')
// 链接数据库 如果没有自动创建
function _connectDB (callback) {
  let url = settings.dbUrl
  MongoClient.connect(url, function (err, db) {
    if (err) {
      callback(err, null)
      return
    }
    // 数据库链接成功执行回掉
    callback(err, db)
  })
}

(function init () {
  console.log('db initialize')
  let user = settings.user
  let pass = settings.pass
  let nickname = settings.nickname || '暂无昵称'
  let avatar = settings.avatar || ''
  let intro = settings.intro || '暂无介绍'
  let json = { 'user': user, 'pass': pass, 'avatar': avatar, 'intro': intro, 'nickname': nickname }
  _connectDB(function (err, db) {
    if (err) {
      console.log(err)
    }
    let usersCollection = db.collection('users')
    usersCollection.find({ 'user': user }).toArray(function (err, result) {
      if (err) {
        console.log('查询管理员失败')
        db.close()
        return
      }
      if (result.length !== 0) {
        db.close()
        return
        // usersCollection.deleteMany({ "user": user })
      }
      usersCollection.insertOne(json, function (err, res) {
        if (err) {
          console.log('管理员信息初始化失败')
          db.close()
          return
        }
        console.log('管理员信息初始化成功')
        db.close()
      })
    })
  })
})()

// 插入数据
exports.insertOne = function (collectionName, json, callback) {
  _connectDB(function (err, db) {
    if (err) {
      console.log(err)
      return
    }
    db.collection(collectionName).insertOne(json, function (err, result) {
      if (err) {
        callback(err, null)
        db.close()
        return
      }
      callback(err, result)
      db.close()
    })
  })
}

// 查找数据
exports.find = function (collectionName, queryJson, callback) {
  _connectDB(function (err, db) {
    if (err) {
      console.log(err)
      return
    }
    let json = queryJson.query || {}
    let limit = Number(queryJson.limit) || 0
    let count = Number(queryJson.page) - 1
    let sort = queryJson.sort || {}
    // 页数为0或者1都显示前limit条数据
    if (count <= 0) {
      count = 0
    } else {
      count = count * limit
    }

    let cursor = db.collection(collectionName).find(json).limit(limit).skip(count).sort(sort)
    cursor.toArray(function (err, results) {
      if (err) {
        callback(err, null)
        db.close()
        return
      }
      callback(err, results)
      db.close()
    })
  })
}

// 删除数据
exports.deleteMany = function (collectionName, json, callback) {
  _connectDB(function (err, db) {
    if (err) {
      console.log(err)
      return
    }
    db.collection(collectionName).deleteMany(json, function (err, results) {
      if (err) {
        callback(err, null)
        db.close()
        return
      }
      callback(err, results)
      db.close()
    })
  })
}

// 修改数据
exports.updateMany = function (collectionName, jsonOld, jsonNew, callback) {
  _connectDB(function (err, db) {
    if (err) {
      console.log(err)
      return
    }
    db.collection(collectionName).updateMany(
      jsonOld, {
        $set: jsonNew,
        $currentDate: { 'lastModified': false }
      },
      function (err, results) {
        if (err) {
          callback(err, null)
          db.close()
          return
        }
        callback(err, results)
        db.close()
      })
  })
}

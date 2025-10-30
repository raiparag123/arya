'use strict';
//Added for testing purposes
const { connectToMongoDB } = require('../utils/mongoConnection');

// Find ONE
const mongoFindOne = async (model, query = {}, projection = {}, options = {}) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  return await thisCollection.findOne(query, { projection, ...options });
};

// Find Many
const mongoFind = async (model, query = {}, projection = {}) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  return await thisCollection.find(query).project(projection).toArray();
};

// Find Sort and Limit
const mongoFindSortLimit = async (model, query = {}, options = {}) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  return await thisCollection.find(query, options).toArray();
};

const mongoFindWithSort = async (model, query = {}, projection = {}, sort = {}) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  return await thisCollection.find(query).project(projection).sort(sort).toArray();
};

// Find ONE and Update
const mongoFindOneAndUpdate = async (model, filter, updateDoc, options) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  options = { returnNewDocument: true, upsert: true, ...options };
  return await thisCollection.findOneAndUpdate(filter, updateDoc, options);
};

// Insert ONE
const mongoInsertOne = async (model, doc) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  doc.createdAt = new Date().toISOString();
  doc.updatedAt = new Date().toISOString();
  return await thisCollection.insertOne(doc);
};

// Insert Many
const mongoInsertMany = async (model, docs) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  const options = { ordered: true };
  return await thisCollection.insertMany(docs, options);
};

// Update ONE
const mongoUpdateOne = async (model, filter, updateDoc) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  const options = { upsert: false };
  return await thisCollection.updateOne(filter, updateDoc, options);
};

// Update Many
const mongoUpdateMany = async (model, filter, updateDocs, options) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  return await thisCollection.updateMany(filter, updateDocs, options);
};

// Aggregate
const mongoAggregate = async (model, QUERY) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  return await thisCollection.aggregate(QUERY).toArray();
};

// Count Total Documents
const mongoCountDocuments = async (model, query = {}) => {
  const mongoClientDB = await connectToMongoDB();
  const thisCollection = mongoClientDB.collection(model);
  return await thisCollection.countDocuments(query);
};

module.exports =  {
  mongoFindOne,
  mongoFind,
  mongoFindSortLimit,
  mongoFindWithSort,
  mongoFindOneAndUpdate,
  mongoInsertOne,
  mongoInsertMany,
  mongoUpdateOne,
  mongoUpdateMany,
  mongoAggregate,
  mongoCountDocuments
};

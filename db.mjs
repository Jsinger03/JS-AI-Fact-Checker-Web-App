
//schema to define a user
const UserSchema = new mongoose.Schema({
    username:{ type: String, required: true, unique: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    queries:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Query' }],
  });

//schema to define a query
const QuerySchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalText:{ type: String, required: true },
    sourceURL: {type: String, required: false},
    summary:{ type: String },
    factCheckResult: [{
      textSegment: String,
      suggestion:  String,
      startIndex:  Number,
      endIndex:    Number,
    }],
    accuracyScore: {type: Number, required: true},
    createdAt:{ type: Date, default: Date.now },
  });
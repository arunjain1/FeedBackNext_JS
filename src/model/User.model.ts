import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document {
    content : string;
    createdAt : Date
}

export interface User extends Document {
    username : string;
    email : string;
    password : string;
    verifyCode : string;
    verifyCodeExpiry : Date;
    isVerified : boolean;
    isAcceptingMessage : boolean;
    messages : Message[]
}

const MessageSchema: Schema<Message>  = new Schema(
    {
      content : {
        type : String,
        required : true,
      },
      createdAt : {
        type : Date,
        required : true,
        default : Date.now()
      }
    },
    {
     timestamps : true
    }
);

const UserSchema: Schema<User>  = new Schema(
    {
      username : {
        type : String,
        required : [true,"UserName is Required"],
        trim : true,
        unique : true
      },
      email : {
        type : String,
        required : [true,"Email is Required"],
        unique : true,
        match : [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,"please use a valid email address"],
      },
      password : {
        type : String,
        required : [true,"Password is required"]
      },
      verifyCode : {
        type : String,
        required : [true,"Verify Code is required"]
      },
      verifyCodeExpiry : {
        type : Date,
        required : [true,"Verify Code is required"]
      },
      isVerified : {
        type : Boolean,
        default : false,
      },
      isAcceptingMessage : {
        type : Boolean,
        default : true,
      },
      messages : [MessageSchema]
    },
    {
     timestamps : true
    }
);

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

export default UserModel;
export interface IAlbum {
    userId: string;
    title: string;
    id: Number;
}

export class Album implements IAlbum
{
    userId!: string;
    title!: string;
    id!: Number;
    
    constructor()
    {
        this.userId = '';
        this.title = '';
        this.id = 0;
    }  

}
//67c69b4334415a88fd982224
/* 
context: string;
id: string;
type: string;
 */
export interface IMessages<T> {
    'hydra:totalItems': number;
    'hydra:member': T[];
  }



export interface IMessageItem 
{
id: string;
msgid: string;
from: {
  address: string;
  name: string;
};
to: {
  address: string;
  name: string;
};
subject: string;
intro: string;
seen: boolean;
isDeleted: boolean;
hasAttachments: boolean;
size: number;
downloadUrl: string;
createdAt: string;
updatedAt: string;
accountId: string;
}


/** getMessages() */
export interface IMessagesResult 
{
id: string;
accountId: string;
msgid: string;
from: {
  address: string;
  name: string;
};
to: {
  address: string;
  name: string;
};
subject: string;
intro: string;
seen: boolean;
isDeleted: boolean;
hasAttachments: boolean;
size: number;
downloadUrl: string;
createdAt: string;
updatedAt: string;
}

/** getMessage() */
export interface IMessageResult extends IMessagesResult 
{
cc: string[];
bcc: string[];
flagged: boolean;
isDeleted: boolean;
verifications: string[];
retention: boolean;
retentionDate: string;
text: string;
html: string[];
attachments: Attachment[];
size: number;
}




export interface Attachment {
    id: string;
    filename: string;
    contentType: string;
    disposition: string;
    transferEncoding: string;
    related: boolean;
    size: number;
    downloadUrl: string;
  }
  
  /** setMessageSeen() */
  export interface IMessageSeen {
    seen: boolean;
  }

  export interface IMessage
  {
      context: string;
      id: string;
      type: string;
      totalItems : number;
      member: IMember;
  }
  
  export interface IMember 
  {
      id: string;
      type: string;
  }
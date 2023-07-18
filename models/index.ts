export type MeetingItem = {
    id: number;
    meeting_title: string;
    total_wait_time: number;
    total_meeting_time: number;
    total_wait_cost: number;
    total_meeting_cost: number;
    meeting_datetime: Date;
    number_of_participants : number;
    average_hourly_cost : number;//average employee hourly
  };

export function createNewMeetingItem(id:number = -1,meeting_title:string = 'new meeting', meeting_datetime:Date = new Date(), rate = 100, participants = 5): MeetingItem{
  var idnum;
  if(id >= 0){
    idnum = id;
  }  else{
    //replace with db call
    idnum = 0;
  }
  var meeting:MeetingItem = { 
                                id: id,
                                total_wait_time: 0,
                                total_meeting_time:0,
                                total_meeting_cost:0,
                                total_wait_cost:0, 
                                meeting_title: meeting_title, 
                                meeting_datetime: meeting_datetime,  
                                average_hourly_cost: rate,
                                number_of_participants: participants,
                              };
    return meeting;
}


var eventToUpdate = null;

//function to schedule the event and also updates the event
function scheduleevent(start,end){
  let starttime=start;
  let endtime=end;
  let title="";
  if(!end)
  {
    title = $('#eventname').val();
    starttime = (moment(($('#stime').val()),'HH:mm a'));
    endtime =  (moment(($('#etime').val()),'HH:mm a'));
    
  } else {
    title = prompt('Event Title:');
  }
  if(eventToUpdate){
    eventToUpdate.title = title;
    eventToUpdate.start = starttime;
    eventToUpdate.end = endtime;
    $('#calendar').fullCalendar('updateEvent', eventToUpdate);
    eventToUpdate = null;
  }
  else{
    $('#calendar').fullCalendar( 'renderEvent',{title:title,start:starttime,end:endtime},true);
  }
  clearModal();
  $('#myModal').modal('hide');
}

//Function to update the details of the Event
function update(event,element){
  if(confirm("Are you Sure you want to change the details?"))
  {
    fillModal(event);
    $('#myModal').modal();
  }
}


//function to clear the modal once the details have been entered
function clearModal(){
  $('#eventname').val("");
  $('#stime').val("");
  $('#etime').val("");
  eventToUpdate = null;
}


//function to fill the modal with previously set values in case of an update event
function fillModal(event){
  $('#eventname').val(event.title);
  $('#stime').val(event.start.format('HH:mm a'));
  $('#etime').val(event.end.format('HH:mm a'));
  eventToUpdate = event;
}

$(document).ready(function() {

 $('#calendar').fullCalendar({
   defaultView: 'agendaDay',
   header: {
     right: ' prev,next'
   },
   editable:true,
   selectable: true,
   select: scheduleevent,
   eventClick: update
 });


 $('#submit').click(function(){
  let starttime = (moment(($('#stime').val()),'HH:mm a'));
  let endtime =  (moment(($('#etime').val()),'HH:mm a'));
  if(starttime>endtime)
  {
    alert("start time cannot be greater than end time");
    $('#myModal').modal();

  }
  else
  {
     scheduleevent();
  }


 });

 $('#schedule_event').click(function(){
  clearModal();
 })

});
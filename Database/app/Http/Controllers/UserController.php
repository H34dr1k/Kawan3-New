<?php

namespace App\Http\Controllers;

use App\User;
use App\Setting;
use App\Hobby;
use App\Event;
use App\Community;
use App\CommunityDetail;
use App\EventDetail;
use App\Friend;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function all()
    {
        return User::all();
    }

    public function hobby()
    {
        return Hobby::all();
    }

    public function request($kodeuser)
    {
        $requesting = [];
        $requested = Friend::where('user2', $kodeuser)->where('type', 'r')->get();
        for ($i=0; $i < count($requested); $i++) { 
            array_push($requesting, $requested[$i]->user1);
        }

        $users = User::whereIn('kodeuser', $requesting)->get();
        return $users;
    }

    public function getComms()
    {

        return Community::all();
    }

    public function getCommsNotCreator($creator)
    {
        $joinedComm = CommunityDetail::where('member', $creator);
        $dataCommDetail = $joinedComm->get();

        $idComms = [];
        // return $joinedEvent->get();
        for ($i=0; $i < $joinedComm->count(); $i++) { 
            $idComm = $dataCommDetail[$i]->idCommunity;

            array_push($idComms, $idComm);
        }
        
        $dataComm = Community::where('creator', '!=', $creator)->whereNotIn('id', $idComms)->get();
        for ($i=0; $i < $dataComm->count(); $i++) { 
            $jumlahAnggota = CommunityDetail::where('idCommunity', $dataComm[$i]->id)->count();
            $dataComm[$i]->memberCount = $jumlahAnggota + 1;
        }

        return $dataComm;
    }

    public function getFriends($kodeuser)
    {
        $friends = [];
        $friend1 = Friend::where('user1', $kodeuser)->where('type', 'f')->get();
        $friend2 = Friend::where('user2', $kodeuser)->where('type', 'f')->get();
        for ($i=0; $i < count($friend1); $i++) { 
            array_push($friends, $friend1[$i]->user2);
        }
        for ($i=0; $i < count($friend2); $i++) { 
            array_push($friends, $friend2[$i]->user1);
        }

        $users = User::whereIn('kodeuser', $friends)->get();
        return $users;
    }

    public function getUser($kodeuser)
    {
        $users = User::where('kodeuser', '!=', $kodeuser)->get();
        $blUsers = [];
        for ($i=0; $i < count($users); $i++) { 
            $requestedFromUser1 = Friend::where('user1', $kodeuser)->where('user2', $users[$i]->kodeuser)->get();
            $requestedFromUser2 = Friend::where('user1', $users[$i]->kodeuser)->where('user2', $kodeuser)->where('type', '!=', 'r')->get();
            
            if($requestedFromUser1 != "[]"){
                array_push($blUsers, $users[$i]->kodeuser);
            }

            if($requestedFromUser2 != "[]"){
                array_push($blUsers, $users[$i]->kodeuser);
            }
        }

        $finalUsers = User::where('kodeuser', '!=', $kodeuser)->whereNotIn('kodeuser', $blUsers)->get();
        return $finalUsers;
    }

    public function getData($email)
    {
        $data = User::where("email", $email)->first();
        
        $setting = Setting::where("kodeuser", $data['kodeuser'])->first();

        unset($data['setting']);

        $data['setting'] = $setting;

        if(is_null($data)){
            return "";
        }else{
            return $data;
        }
    }

    public function com()
    {
        
    }

    public function getEvents()
    {
        return Event::get();
    }

    public function getEventNotCreator($id)
    {
        $joinedEvent = EventDetail::where('attendees', $id);
        $dataEventDetail = $joinedEvent->get();

        $idEvents = [];
        // return $joinedEvent->get();
        for ($i=0; $i < $joinedEvent->count(); $i++) { 
            $idEvent = $dataEventDetail[$i]->idEvent;

            array_push($idEvents, $idEvent);
        }
        
        $dataEvent = Event::where('creator', '!=', $id)->whereNotIn('id', $idEvents)->get();
        for ($i=0; $i < $dataEvent->count(); $i++) { 
            $jumlahAnggota = EventDetail::where('idEvent', $dataEvent[$i]->id)->count();
            $dataEvent[$i]->memberCount = $jumlahAnggota + 1;
        }

        return $dataEvent;
    }

    public function getEvent($id, $kodeuser)
    {
        $event = Event::find($id);
        $eventDetail = EventDetail::where('idEvent', $id);

        $event->memberCount = $eventDetail->count() + 1;

        $members = $eventDetail->get();
        $event->joined = 'no';
        for ($i=0; $i < count($members); $i++) { 
            if($members[$i]->attendees == $kodeuser){
                $event->joined = 'yes';
                break;
            }
        }

        $creator = User::where('kodeuser', '!=', $kodeuser)->first();
        $event->creatorName = $creator->name;

        return $event;
    }

    public function getEventByCreator($creator)
    {
        $dataEvent = Event::where('creator', $creator)->get();
        for ($i=0; $i < $dataEvent->count(); $i++) { 
            $jumlahAnggota = EventDetail::where('idEvent', $dataEvent[$i]->id)->count();
            $dataEvent[$i]->memberCount = $jumlahAnggota + 1;
        }

        return $dataEvent;
    }
    
    public function getEventByCreatorCount($creator, $count)
    {
        $dataEvent = Event::where('creator', $creator)->take($count)->get();
        for ($i=0; $i < $dataEvent->count(); $i++) { 
            $jumlahAnggota = EventDetail::where('idEvent', $dataEvent[$i]->id)->count();
            $dataEvent[$i]->memberCount = $jumlahAnggota + 1;
        }

        return $dataEvent;
    }

    public function getJoinedEvent($attendees)
    {
        $joinedEvent = EventDetail::where('attendees', $attendees);
        $dataEventDetail = $joinedEvent->get();

        $idEvents = [];
        // return $joinedEvent->get();
        for ($i=0; $i < $joinedEvent->count(); $i++) { 
            $idEvent = $dataEventDetail[$i]->idEvent;

            array_push($idEvents, $idEvent);
        }
        
        $datetime = date('Y-m-d H:i:s');
        $dataEvent = Event::whereIn('id', $idEvents)->where('datetime', '>=', $datetime)->get();
        for ($i=0; $i < $dataEvent->count(); $i++) { 
            $jumlahAnggota = EventDetail::where('idEvent', $dataEvent[$i]->id)->count();
            $dataEvent[$i]->memberCount = $jumlahAnggota + 1;
        }

        return $dataEvent;
    }

    public function getEventRec($creator)
    {
        $datetime = date('Y-m-d H:i:s');
        $e = Event::where('creator', '!=', $creator)->where('datetime', '>=', $datetime)->take(10)->get();

        $idEvents = [];

        for ($i=0; $i < $e->count(); $i++) { 
            $eventDetail = EventDetail::where('idEvent', $e[$i]->id);
            $jumlahAnggota = $eventDetail->count();
            if($jumlahAnggota > 0){
                foreach ($eventDetail->get() as $key => $value) {
                    if($value['attendees'] == $creator){
                        array_push($idEvents, $value['idEvent']);
                        break;
                    }
                }
            }
        }

        $dataEvent = Event::where('creator', '!=', $creator)->whereNotIn('id', $idEvents)->inRandomOrder()->take(3)->get();

        for ($i=0; $i < $dataEvent->count(); $i++) { 
            $eventDetail = EventDetail::where('idEvent', $dataEvent[$i]->id);
            $jumlahAnggota = $eventDetail->count();
            $dataEvent[$i]->memberCount = $jumlahAnggota + 1;
        }

        return $dataEvent;
    }

    public function getHistoryEvent($kodeuser)
    {
        $joinedEvent = EventDetail::where('attendees', $kodeuser);
        $dataEventDetail = $joinedEvent->get();

        $idEvents = [];
        // return $joinedEvent->get();
        for ($i=0; $i < $joinedEvent->count(); $i++) { 
            $idEvent = $dataEventDetail[$i]->idEvent;

            array_push($idEvents, $idEvent);
        }
        
        $datetime = date('Y-m-d H:i:s');
        $dataEvent = Event::whereIn('id', $idEvents)->where('datetime', '<', $datetime)->get();
        for ($i=0; $i < $dataEvent->count(); $i++) { 
            $jumlahAnggota = EventDetail::where('idEvent', $dataEvent[$i]->id)->count();
            $dataEvent[$i]->memberCount = $jumlahAnggota + 1;
        }

        return $dataEvent;
    }

    public function createComm(Request $request, $kodeuser)
    {
        $dataInsert = $request->json()->all();

        $data = new Community;
        $data->name = $dataInsert['name'];
        $data->desc = $dataInsert['desc'];
        $data->creator = $kodeuser;
        $data->maxmember = $dataInsert['max'];
        $data->membersetting = $dataInsert['membersetting'];
        $data->latitude = $dataInsert['lat'];
        $data->longitude = $dataInsert['long'];
        $data->save();

        return 'berhasil';
    }

    public function createUser(Request $request)
    {
        $dataInsert = $request->json()->all();
        
        $data = new User;
        $data->kodeuser = $dataInsert['kodeuser'];
        $data->name = $dataInsert['nama'];
        $data->password = $dataInsert['password'];
        $data->email = $dataInsert['email'];
        $data->gender = $dataInsert['gender'];
        $data->loggedIn = $dataInsert['loggedIn'];
        $data->desc = $dataInsert['desc'];
        $data->hobby = $dataInsert['hobby'];
        $data->setting = $dataInsert['setting'];
        $data->save();

        return "Data Berhasil Ditambah";
    }

    public function createSetting(Request $request)
    {
        $dataInsert = $request->json()->all();

        $data = new Setting;
        $data->kodeuser = $dataInsert['kodeuser'];
        $data->save();

        $dataBaru = Setting::where('kodeuser', $dataInsert['kodeuser'])->first();
        return $dataBaru->id;
    }

    public function createEvent(Request $request)
    {
        $dataInsert = $request->json()->all();

        $data = new Event;
        $data->name = $dataInsert['name'];
        $data->desc = $dataInsert['desc'];
        $data->category = $dataInsert['category'];
        $data->alamat = $dataInsert['alamat'];
        $data->datetime = $dataInsert['datetime'];
        $data->creator = $dataInsert['creator'];
        $data->save();

        return "berhasil";
    }

    public function joinEvent(Request $request, $idEvent, $attendees)
    {
        $data = new EventDetail;
        $data->idEvent = $idEvent;
        $data->attendees = $attendees;
        $data->save();

        return "berhasil";
    }

    public function joinComm(Request $request, $idCommunity, $member)
    {
        $data = new CommunityDetail;
        $data->idCommunity = $idCommunity;
        $data->member = $member;
        $data->save();

        return "berhasil";
    }

    public function req($user1, $user2)
    {
        $requestedFromUser2 = Friend::where('user1', $user2)->where('user2', $user1)->first();
        if($requestedFromUser2 != "[]"){
            $requestedFromUser2->type = 'f';
            $requestedFromUser2->save();

            return 'friend';
        }

        $data = new Friend;
        $data->user1 = $user1;
        $data->user2 = $user2;
        $data->type = 'r';
        $data->save();

        return 'requested';
    }

    public function update(Request $request, $id)
    {
        $data = User::find($id);
        if(is_null($data)){
            return "Data Tidak Ditemukan";
        }else{
            $dataInsert = $request->json()->all();

            if($dataInsert['status'] == "profile"){
                $data->name = $dataInsert['name'];
                $data->desc = $dataInsert['desc'];
                // $data->gender = $dataInsert['gender'];
            }
            else{
                $data->loggedIn = $dataInsert['loggedIn'];
            }
            $data->save();

            return "berhasil";
        }
    }

    public function updateEvent(Request $request, $id)
    {
        $dataInsert = $request->json()->all();

        $data = Event::find($id);
        $data->name = $dataInsert['name'];
        $data->desc = $dataInsert['desc'];
        $data->category = $dataInsert['category'];
        $data->alamat = $dataInsert['alamat'];
        $data->datetime = $dataInsert['datetime'];
        $data->save();

        return "berhasil";
    }

    public function updateSetting(Request $request, $id){
        $data = Setting::where('kodeuser', $id)->first();

        $dataInsert = $request->json()->all();

        if($dataInsert['settingOn'] == "privasi"){
            $data->privacyBerbagiLokasi = $dataInsert['privacyBerbagiLokasi'];
            $data->privacyTampilkanFotoAnda = $dataInsert['privacyTampilkanFotoAnda'];
            $data->privacyTerimaTeman = $dataInsert['privacyTerimaTeman'];
        }
        else{
            $data->notifikasi = $dataInsert['notifikasi'];
            $data->notifikasiDariTeman = $dataInsert['notifikasiDariTeman'];
            $data->notifikasiDariOrangTerdekat = $dataInsert['notifikasiDariOrangTerdekat'];
            $data->postinganDariTeman = $dataInsert['postinganDariTeman'];
            $data->postinganDariOrangTerdekat = $dataInsert['postinganDariOrangTerdekat'];
        }
        
        $data->save();

        return "berhasil";
    }

    public function rblock($user1, $user2)
    {
        $data = Friend::where('user1', $user2)->where('user2', $user1)->first();
        $data->type = 'b';
        $data->save();

        return 'berhasil';
    }

    public function raccept($user1, $user2)
    {
        $data = Friend::where('user1', $user2)->where('user2', $user1)->first();
        $data->type = 'f';
        $data->save();

        return 'berhasil';
    }

    public function rdelete($user1, $user2)
    {
        $data = Friend::where('user1', $user2)->where('user2', $user1)->first();
        $data->delete();

        return 'berhasil';
    }

    public function delete($id)
    {
        $data = User::find($id);
        if(is_null($data)){
            return "Data Tidak Ditemukan";
        }else{
            $data->delete();
            return "Data Berhasil Dihapus";
        }
    }

    public function deleteEvent($id)
    {
        // return $id;
        $data = EventDetail::where('idEvent', $id);
        if(!is_null($data)){
            $data->delete();
        }

        $event = Event::find($id)->delete();

        return "berhasil";
    }

    public function leaveEvent(Request $request, $idEvent, $attendees)
    {
        $data = EventDetail::where('idEvent', $idEvent)->where('attendees', $attendees)->delete();

        return "berhasil";
    }
}

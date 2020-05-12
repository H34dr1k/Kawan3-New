<?php

namespace App\Http\Controllers;

use App\User;
use App\Setting;
use App\Hobby;
use App\Event;
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

    // public function req($user1, $user2)
    // {
    //     $data = Friend::where('user1', $user1)->where('user2', $user2)->get();
    //     if(is_null($data))
    //     {
    //         $data = Friend::where('user1', $user2)->where('user2', $user1)->get();

    //         if(is_null($data)){
    //             $data = new Friend;
    //         }
    //     }
    // }

    public function getUser($kodeuser)
    {
        return User::where('kodeuser', '!=', $kodeuser)->get();
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

    public function getEvent($id)
    {
        return Event::find($id);
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
        
        $dataEvent = Event::whereIn('id', $idEvents)->get();
        for ($i=0; $i < $dataEvent->count(); $i++) { 
            $jumlahAnggota = EventDetail::where('idEvent', $dataEvent[$i]->id)->count();
            $dataEvent[$i]->memberCount = $jumlahAnggota + 1;
        }

        return $dataEvent;
    }

    public function getEventRec($creator)
    {
        $e = Event::where('creator', '!=', $creator)->take(10)->get();

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

    public function hob()
    {
        
    }

    public function createUser(Request $request)
    {
        $dataJSON = $request->json()->all();
        $dataInsert = json_decode($dataJSON[0], true);
        
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
        $dataJSON = $request->json()->all();
        $dataInsert = json_decode($dataJSON[0], true);

        $data = new Setting;
        $data->kodeuser = $dataInsert['kodeuser'];
        $data->save();

        $dataBaru = Setting::where('kodeuser', $dataInsert['kodeuser'])->first();
        return $dataBaru->kodeuser;
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
        $dataInsert = $request->json()->all();

        $data = new EventDetail;
        $data->idEvent = $dataInsert['idEvent'];
        $data->attendees = $dataInsert['attendees'];
        $data->save();

        return "berhasil";
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
}

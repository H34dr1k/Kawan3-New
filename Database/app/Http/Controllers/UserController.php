<?php

namespace App\Http\Controllers;

use App\User;
use App\Setting;
use App\Hobby;
use App\Event;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function all()
    {
        return User::all();
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

    public function getEvent($id)
    {
        return Event::find($id);
    }

    public function getEventByCreator($creator)
    {
        return Event::where('creator', '=', $creator)->get();
    }

    public function getEventRec()
    {
        return Event::inRandomOrder()->take(3)->get();
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
        $dataJSON = $request->json()->all();
        $dataInsert = json_decode($dataJSON[0], true);

        $data = new Event;
        $data->name = $dataInsert['name'];
        $data->desc = $dataInsert['desc'];
        $data->creator = $dataInsert['creator'];
        $data->save();

        return $request;
    }

    public function update(Request $request, $id)
    {
        $data = User::find($id);
        if(is_null($data)){
            return "Data Tidak Ditemukan";
        }else{
            $dataJSON = $request->json()->all();
            $dataInsert = json_decode($dataJSON[0], true);

            $data->name = $dataInsert['name'];
            $data->password = $dataInsert['password'];
            $data->email = $dataInsert['email'];
            $data->gender = $dataInsert['gender'];
            $data->loggedIn = $dataInsert['loggedIn'];
            $data->save();

            return "Data berhasil Diupdate";
        }
    }

    public function updateSetting(Request $request, $id){
        $data = Setting::where('kodeuser', $id)->first();

        $dataJSON = $request->json()->all();
        $dataInsert = json_decode($dataJSON[0], true);

        if($dataInsert->settingOn == "privasi"){
            $data->privacyBerbagiLokasi = $dataInsert['privacyBerbagiLokasi'];
            $data->privacyTampilkanFotoAnda = $dataInsert['privacyTampilkanFotoAnda'];
            $data->privacyTerimaTeman = $dataInsert['privacyTerimaTeman'];
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
}

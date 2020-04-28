<?php

namespace App\Http\Controllers;

use App\User;
use App\Setting;
use App\Hobby;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function all()
    {
        return User::all();
    }

    public function getData($email)
    {
        $data = User::where("email", $email)->first();
        
        $setting = Setting::where("kodeuser", $data->kodeuser)->first();

        unset($data->setting);

        $data->setting = $setting;

        if(is_null($data)){
            return "";
        }else{
            return $data;
        }
    }

    public function com()
    {
        
    }

    public function ev()
    {

    }

    public function hob()
    {
        
    }

    public function createUser(Request $request)
    {
        $dataJSON = $request->getContent();
        $dataInsert = json_decode($dataJSON);
        // return $dataInsert->name;
        
        $data = new User;
        $data->kodeuser = $dataInsert->kodeuser;
        $data->name = $dataInsert->name;
        $data->password = $dataInsert->password;
        $data->email = $dataInsert->email;
        $data->gender = $dataInsert->gender;
        $data->loggedIn = $dataInsert->loggedIn;
        $data->desc = $dataInsert->desc;
        $data->save();

        return "Data Berhasil Ditambah";
    }

    public function update(Request $request, $id)
    {
        $data = User::find($id);
        if(is_null($data)){
            return "Data Tidak Ditemukan";
        }else{
            $dataJSON = $request->getContent();
            $dataInsert = json_decode($dataJSON);

            $data->name = $dataInsert->name;
            $data->password = $dataInsert->password;
            $data->email = $dataInsert->email;
            $data->gender = $dataInsert->gender;
            $data->loggedIn = $dataInsert->loggedIn;
            $data->save();

            return "Data berhasil Diupdate";
        }
    }

    public function updateSetting(Request $request, $id){
        $data = Setting::where('kodeuser', $id)->first();

        $dataJSON = $request->getContent();
        $dataInsert = json_decode($dataJSON);

        if($dataInsert->settingOn == "privasi"){
            $data->privacyBerbagiLokasi = $dataInsert->privacyBerbagiLokasi;
            $data->privacyTampilkanFotoAnda = $dataInsert->privacyTampilkanFotoAnda;
            $data->privacyTerimaTeman = $dataInsert->privacyTerimaTeman;
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

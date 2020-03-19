<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function all()
    {
        return User::all();
    }

    public function getData($id)
    {
        $data = User::find($id);
        if(is_null($data)){
            return response()->json([
                "message" => "Data Tidak Ditemukan"
            ]);
        }else{
            return $data;
        }
    }

    public function create(Request $request)
    {
        $dataJSON = $request->getContent();
        $dataInsert = json_decode($dataJSON);
        return $dataInsert->name;
        
        // $data = new User;
        // $data->kodeuser = $dataInsert->kodeuser;
        // $data->name = $dataInsert->name;
        // $data->password = $dataInsert->password;
        // $data->email = $dataInsert->email;
        // $data->gender = $dataInsert->gender;
        // $data->loggedIn = $dataInsert->loggedIn;
        // $data->save();

        // return response()->json([
        //     "message" => "Data Berhasil Ditambah"
        // ]);
    }

    public function update(Request $request, $id)
    {
        $data = User::find($id);
        if(is_null($data)){
            return response()->json([
                "message" => "Data Tidak Ditemukan"
            ]);
        }else{
            $dataJSON = $request->getContent();
            $dataInsert = json_decode($dataJSON);

            $data->name = $dataInsert->name;
            $data->password = $dataInsert->password;
            $data->email = $dataInsert->email;
            $data->gender = $dataInsert->gender;
            $data->loggedIn = $dataInsert->loggedIn;
            $data->save();

            return response()->json([
                "message" => "Data Berhasil Diupdate"
            ]);
        }
    }

    public function delete($id)
    {
        $data = User::find($id);
        if(is_null($data)){
            return response()->json([
                "message" => "Data Tidak Ditemukan"
            ]);
        }else{
            $data->delete();
            return response()->json([
                "message" => "Data Berhasil Dihapus"
            ]);
        }
    }
}

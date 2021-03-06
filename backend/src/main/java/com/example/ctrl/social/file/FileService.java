package com.example.ctrl.social.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class FileService {
	
	public String writeBase64EncondedStringToFile(String image) throws IOException {
		String fileName = generateRandomName();
		File target = new File("pictures/" + fileName);
		OutputStream outputStream = new FileOutputStream(target);
		byte[] base64encoded = java.util.Base64.getDecoder().decode(image);

		outputStream.write(base64encoded);
		outputStream.close();
		return fileName;
	}
	
	private String generateRandomName() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

}

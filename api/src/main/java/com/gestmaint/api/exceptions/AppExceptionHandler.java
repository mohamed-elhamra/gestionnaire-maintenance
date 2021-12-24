package com.gestmaint.api.exceptions;

import com.gestmaint.api.responses.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    public ResponseEntity<Object> userExceptionHandlerForDataValidationError(MethodArgumentNotValidException ex, WebRequest rq){
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(value = {GestMaintException.class})
    public ResponseEntity<Object> eatItExceptionHandler(GestMaintException ex, WebRequest rq){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(buildException(ex));
    }

    @ExceptionHandler(value = {RuntimeException.class})
    public ResponseEntity<Object> othersExceptionHandler(RuntimeException ex, WebRequest rq){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(buildException(ex));
    }

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<Object> othersExceptionHandler(Exception ex, WebRequest rq){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(buildException(ex));
    }

    private ErrorMessage buildException(Exception ex){
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setTimestamp(new Date());
        errorMessage.setException(ex.getClass().getName());
        errorMessage.setMessage(ex.getMessage());
        if(ex.getCause() != null){
            errorMessage.setCause(ex.getCause().getMessage());
        }
        return errorMessage;
    }

}

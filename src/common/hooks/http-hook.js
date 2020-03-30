import {useCallback, useRef, useState, useEffect} from "react";


export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const activeHttpRequests = useRef([]);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  const clearErrors = () => {
    setErrors(null);
  };

  const sendRequest = useCallback(async (url, method = "GET", headers = {}, body = null) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
        signal: httpAbortCtrl.signal
      });

      const responseData = await response.json();

      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

      if (!response.ok) {
        let errs = [];
        responseData.errors.map(error => errs.push(new Error(error)));
        throw errs;
      }

      setIsLoading(false);
      return responseData;
    } catch (errs) {
      setIsLoading(false);
      setErrors(errs);
      throw errs;
    }
  }, []);

  return {
    isLoading: isLoading,
    errors: errors,
    sendRequest: sendRequest,
    clearErrors: clearErrors
  };
};

-``` throw new HttpException('文章已存在', 401); ``` 调用错误信息
### http内置异常
1. BadRequestException
   ``` javascript
    {
      "statusCode": 400,
      "message": "Bad Request"
    } 
   ```
2. UnauthorizedException
   ``` javascript
    {
      "statusCode": 401,
      "message": "Unauthorized"
    } 
   ```
3. NotFoundException
   ``` javascript
    {
      "statusCode": 404,
      "message": "Not Found"
    } 
   ```
4. ForbiddenException
   ``` javascript
    {
    "statusCode": 403,
    "message": "Forbidden"
    } 
   ```
5. NotAcceptableException
   ``` javascript
    {
      "statusCode": 406,
      "message": "Not Acceptable"
    } 
   ```
6. RequestTimeoutException
   ``` javascript
    {
      "statusCode": 408,
      "message": "Request Timeout"
    } 
   ```
7. ConflictException
   ``` javascript
    {
      "statusCode": 409,
      "message": "Conflict"
    } 
   ```
8. GoneException
   ``` javascript
    {
      "statusCode": 410,
      "message": "Gone"
    } 
   ```
9.  HttpVersionNotSupportedException
   ``` javascript
    {
      "statusCode": 505,
      "message": "HTTP Version Not Supported"
    } 
   ```
10. PayloadTooLargeException
   ``` javascript
    {
      "statusCode": 413,
      "message": "Payload Too Large"
    } 
   ```
11. UnsupportedMediaTypeException
   ``` javascript
    {
      "statusCode": 415,
      "message": "Unsupported Media Type"
    } 
   ```
12. UnprocessableEntityException
   ``` javascript
    {
      "statusCode": 422,
      "message": "Unprocessable Entity"
    } 
   ```
13. InternalServerErrorException
   ``` javascript
    {
      "statusCode": 500,
      "message": "Internal Server Error"
    } 
   ```
14. NotImplementedException
   ``` javascript
    {
      "statusCode": 501,
      "message": "Not Implemented"
    } 
   ```
15. ImATeapotException
   ``` javascript
    {
      "statusCode": 418,
      "message": "I'm a teapot"
    } 
   ```
16. MethodNotAllowedException
   ``` javascript
    {
      "statusCode": 405,
      "message": "Method Not Allowed"
    } 
   ```
17. BadGatewayException
   ``` javascript
    {
      "statusCode": 502,
      "message": "Bad Gateway"
    } 
   ```
18. ServiceUnavailableException
   ``` javascript
    {
      "statusCode": 503,
      "message": "Service Unavailable"
    } 
   ```
19. GatewayTimeoutException
   ``` javascript
    {
      "statusCode": 504,
      "message": "Gateway Timeout"
    } 
   ```
20. PreconditionFailedException
   ``` javascript
    {
      "statusCode": 412,
      "message": "Precondition Failed"
    } 
   ```
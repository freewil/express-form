# express-form changelog

## v0.12.7 (2016/08/31)
* add translation support

## v0.12.6 (2016/06/30)
* Guard against request body not inheriting from Object.prototype

## v0.12.5 (2016/03/23)
* remove upper-bound for TLD length on email validation

## v0.12.4 (2014/11/27)
* update dependencies

## v0.12.3 (2014/07/29)
* fix stack size explosion when using `autoTrim`

## v0.12.2 (2014/04/16)
* add express 4 support

## v0.12.1 (2014/04/09)
* tighten up newly-added `isEmail()` regex

## v0.12.0 (2014/03/03)
* simplify isEmail() regex (only checks for @); fixes ReDos vuln.

## v0.10.0 (2013/10/23)
* add support for asynchronous custom validators/filters

## v0.8.1 (2013/02/21)
* cast to string for string-specific filters to prevent errors

## v0.8.0 (2013/02/16)
* use express 3.x for peer and dev dependencies

## v0.7.1 (2013/02/16)
* use express 2.x as peer dependency

## v0.7.0 (2013/02/13)
* add express 3.x support
* add express as peer dependency
* add isDate validator
* upgrade validator module to 0.4.x

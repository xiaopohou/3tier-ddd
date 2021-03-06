﻿using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Linq;
using System.Collections.Generic;
using System.Web.Security;

namespace RefactorName.WebApp
{
    public class MainAuthorize : System.Web.Mvc.AuthorizeAttribute
    {
        public string SessionTimeoutMessage { set; get; }
        public string NotAuthorizedMessage { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        private Boolean IsAuthorize = true;

        public MainAuthorize()
        {
            SessionTimeoutMessage = "الرجاء تسجيل الدخول.";
            NotAuthorizedMessage = "عفواً .. لا تملك الصلاحية لدخول هذه الصفحة.";
            Controller = "Account";
            Action = "Login";
        }


        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool permission = false;
            bool authenticated = false;
            //authenticated = Request.IsAuthenticated;

            //check the session first
            if (httpContext.Session["User"] == null || !authenticated) // not loged in or session timeout
                return false;

            else
            {
                //TODO: Compute permission

                if (!permission) //Not Authorized
                {
                    IsAuthorize = false;
                    return false;
                }
            }

            return true; //Authorized
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            var controller = filterContext.Controller as BaseController;

            UrlHelper url = new UrlHelper(filterContext.RequestContext);
            if (IsAuthorize) //session timeout or not loged in
            {
                HttpContext.Current.Session.Abandon(); //clear the session
                //FormsAuthentication.SignOut();

                controller.ShowWarningSnackbar(SessionTimeoutMessage);

                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    // For AJAX requests, we're overriding the returned JSON result with a simple string,
                    // indicating to the calling JavaScript code that a redirect should be performed.     

                    filterContext.Result = new JsonResult { Data = new { success = false, url = url.Action(Action, Controller, new { returnUrl = filterContext.HttpContext.Request.UrlReferrer.PathAndQuery }), message = SessionTimeoutMessage }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
                else
                {
                    // For round-trip posts, we're forcing a redirect to Home/TimeoutRedirect/, which
                    // simply displays a temporary 5 second notification that they have timed out, and
                    // will, in turn, redirect to the logon page.

                    filterContext.Result = new RedirectToRouteResult(
                        new RouteValueDictionary {
                        { "Controller",  Controller},
                        { "Action", Action },
                        { "returnUrl", filterContext.HttpContext.Request.Url.PathAndQuery.ToString()}
                });
                }
            }
            else
            {
                controller.ShowWarningSnackbar(NotAuthorizedMessage);

                // Otherwise the reason we got here was because the user didn't have access rights to the
                // operation, and a 403 should be returned.
                //filterContext.Result = new HttpStatusCodeResult(403);
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    // For AJAX requests, we're overriding the returned JSON result with a simple string,
                    // indicating to the calling JavaScript code that a redirect should be performed.         

                    filterContext.Result = new JsonResult { Data = new { success = false, url = url.Action(Action, Controller), message = NotAuthorizedMessage }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
                else
                {
                    // For round-trip posts, we're forcing a redirect to Home/TimeoutRedirect/, which
                    // simply displays a temporary 5 second notification that they have timed out, and
                    // will, in turn, redirect to the logon page.
                    filterContext.Controller.TempData["NotAlowed"] = false;
                    filterContext.Result = new RedirectToRouteResult(
                        new RouteValueDictionary {
                        { "Controller", Controller},
                        { "Action", Action }

                });
                }
            }

        }
    }
}

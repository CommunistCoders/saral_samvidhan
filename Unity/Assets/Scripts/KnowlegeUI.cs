using UnityEngine;
using TMPro;
public class KnowledgeUI : MonoBehaviour
{
    public TMP_Text good;
    public GameObject goodPanel;
    public TMP_Text bad;
    public GameObject badPanel;

    public float time;
    public bool onDisplay;

    void Start()
    {
        clear();
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
        good.text = "Traffic not violated";
        bad.text = "Traffic violated";
    }

    public void setCollisionData()
    {
        good.text = "";
        bad.text = "Public property Damaged";
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
        goodPanel.gameObject.SetActive(false);
        badPanel.gameObject.SetActive(false);
        bad.enabled = false;
        time = 0;
        onDisplay = false;
    }
}
